const router = require('express').Router()
const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const JWTAuthMiddleWare = require('../MiddleWares/JWTAuthMW')

const multer = require('multer');

// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads'); // Specify the destination directory for storing uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Specify how the uploaded file should be named
    }
});

const upload = multer({ storage: storage });

router.post('/register', async (req, res) => {
    let { email, password } = req.body
    try {
        let response = await User.findOne({ email: email })
        if (response) {
            res.status(409).send({
                success: false,
                message: "Email already used."
            })
            return;
        }
        //password encryption
        const salt = await bcrypt.genSalt(10)
        req.body.password = await bcrypt.hash(password, salt)

        response = await User.create(req.body)
        res.status(201).send({
            success: true,
            message: "User successfully registered.",
        })
    }
    catch (err) {
        console.log(err)
        res.status(404).send({
            success: false,
            message: "Err: User registration failed from DB end.",
        })
    }
})

router.post('/sign-in', async (req, res) => {
    let { email, password } = req.body
    try {
        let response = await User.findOne({ email: email })
        if (!response) {
            res.status(404).send({
                success: false,
                message: "Wrong credentials."
            })
            return;
        }

        let verified = await bcrypt.compare(password, response.password)
        if (verified) {
            //create jwt and send back to user
            let token = jwt.sign({ id: response.id, password: req.body.password }, process.env.jwt_secret_key, { expiresIn: "1h" })
            res.status(201).send({
                success: true,
                message: "User successfully logged in.",
                data: token
            })
        }
        else {
            res.status(404).send({
                success: false,
                message: "Wrong credentials."
            })
        }
    }
    catch (err) {
        console.log(err)
        res.status(404).send({
            success: false,
            message: "Err: User registration failed from DB end.",
        })
    }
})

router.post('/user/authorize', JWTAuthMiddleWare, async (req, res) => {
    try {
        let response = await User.findById(req.body.id).select("-password")
            .populate('userMovies')
            .populate('userTheaters')
            .exec()

        if (response) {
            res.status(201).send({
                success: true,
                message: "User authorized.",
                data: response
            })
        }
        else {
            res.status(201).send({
                success: false,
                message: "User authorization failed.",
            })
        }
    }
    catch (err) {
        res.status(404).send({
            success: false,
            message: "Err: User authorization failed from DB end.",
        })
    }
})

router.get('/user/:userid', async (req, res) => {

    let response = await User.findById(req.params.userid).select('-password')
        .populate('userMovies')
        .populate('userTheaters')
        .exec()

    try {
        if (response) {
            res.status(201).send({
                success: true,
                message: "User data fetched.",
                data: response
            })
        }
        else {
            res.status(201).send({
                success: false,
                message: "User data fetch failed.",
            })
        }
    }
    catch (err) {
        res.status(404).send({
            success: false,
            message: "Err: User data fetch failed from DB end.",
        })
    }
})

//, upload.single('profile_pic')
router.patch('/user/:userid/update/profile', upload.single('profile_pic'), async (req, res) => {
    let {first_name, last_name, email, place, dob} = req.body
    let profile_pic = req.file ? req.file.filename : undefined
    console.log("req.body:...", req.body)
    console.log("req...", req.file)
    let response = await User.findByIdAndUpdate(req.params.userid, {
        $set: {
            first_name,
            last_name,
            email,
            place,
            profile_pic,
            dob
        }
    }, {new: true}).select('-password')
        .populate('userMovies')
        .populate('userTheaters')
        .exec()
    // console.log("kkk",response)
    try {
        if (response) {
            res.status(201).send({
                success: true,
                message: "User details updated.",
                data: response
            })
        }
        else {
            res.status(201).send({
                success: false,
                message: "User details updation failed.",
            })
        }
    }
    catch (err) {
        res.status(404).send({
            success: false,
            message: "User details updation failed from DB end.",
        })
    }
})

router.patch(`/user/:userid/update/:place`, async (req, res) => {
    try {
        let response = await User.findByIdAndUpdate(req.params.userid,
            { $set: { place: req.params.place } },
            { new: true }).select('-password')
            .populate('userMovies')
            .populate('userTheaters')
            .exec()

        if (response) {
            res.status(201).send({
                success: true,
                message: "User updated with movie removed.",
                data: response
            })
        }
        else {
            res.status(404).send({
                success: false,
                message: "User updation with movie remove failed.",
            })
        }
    }
    catch (err) {
        res.status(404).send({
            success: false,
            message: "Err: User updation with movie remove failed from DB end.",
        })
    }
})

router.patch('/user/:userid/add-movie/:movieid', async (req, res) => {
    try {
        let response = await User.findByIdAndUpdate(req.params.userid,
            { $push: { userMovies: req.params.movieid } },
            { new: true }).populate('userMovies').select('-password')
            .populate('userMovies')
            .populate('userTheaters')
            .exec()

        if (response) {
            res.status(201).send({
                success: true,
                message: "User updated with new movie added.",
                data: response
            })
        }
        else {
            res.status(404).send({
                success: false,
                message: "User updation with new movie add failed.",
            })
        }
    }
    catch (err) {
        console.log(err)
        res.status(404).send({
            success: false,
            message: "Err: User updation with new movie add failed from DB end.",
        })
    }
})

router.patch('/user/:userid/delete-movie/:movieid', async (req, res) => {
    try {
        let response = await User.findByIdAndUpdate(req.params.userid,
            { $pull: { userMovies: req.params.movieid } },
            { new: true }).select('-password')
            .populate('userMovies')
            .populate('userTheaters')
            .exec()

        if (response) {
            res.status(201).send({
                success: true,
                message: "User updated with movie removed.",
                data: response
            })
        }
        else {
            res.status(404).send({
                success: false,
                message: "User updation with movie remove failed.",
            })
        }
    }
    catch (err) {
        res.status(404).send({
            success: false,
            message: "Err: User updation with movie remove failed from DB end.",
        })
    }
})

router.patch('/user/:userid/add-theater/:theaterid', async (req, res) => {
    try {
        let response = await User.findByIdAndUpdate(req.params.userid,
            { $push: { userTheaters: req.params.theaterid } },
            { new: true }).select('-password')
            .populate('userMovies')
            .populate('userTheaters')
            .exec()

        if (response) {
            res.status(201).send({
                success: true,
                message: "User updated with new theater added.",
                data: response
            })
        }
        else {
            res.status(404).send({
                success: false,
                message: "User updation with new theater add failed.",
            })
        }
    }
    catch (err) {
        res.status(404).send({
            success: false,
            message: "Err: User updation with new theater add failed from DB end.",
        })
    }
})

router.patch('/user/:userid/delete-theater/:theaterid', async (req, res) => {
    try {
        let response = await User.findByIdAndUpdate(req.params.userid,
            { $pull: { userTheaters: req.params.theaterid } },
            { new: true }).select('-password')
            .populate('userMovies')
            .populate('userTheaters')
            .exec()
        console.log("theater del response", response)
        if (response) {
            res.status(201).send({
                success: true,
                message: "User updated with theater removed.",
                data: response
            })
        }
        else {
            res.status(404).send({
                success: false,
                message: "User updation with theater remove failed.",
            })
        }
    }
    catch (err) {
        res.status(404).send({
            success: false,
            message: "Err: User updation with theater remove failed from DB end.",
        })
    }
})

router.patch('/user/:userid/add-show-req', async (req, res) => {
    try {
        let response = await User.findByIdAndUpdate(req.params.userid,
            {
                $push: {
                    showRequests: req.body
                }
            },
            { new: true })
            .populate('userMovies')
            .populate('userTheaters')
            .select('-password').exec()

        if (response) {
            res.status(201).send({
                success: true,
                message: "User updated with new theater added.",
                data: response
            })
        }
        else {
            res.status(404).send({
                success: false,
                message: "User updation with new theater add failed.",
            })
        }
    }
    catch (err) {
        res.status(404).send({
            success: false,
            message: "Err: User updation with new theater add failed from DB end.",
        })
    }
})
 
router.patch('/user/:userid/remove-show-req', async (req, res) => {
    try {
        let response = await User.findByIdAndUpdate(req.params.userid,
            {
                $pull: {showRequests: {showid: req.body.showid, theaterid: req.body.theaterid}}
            },
            { new: true })
            .populate('userMovies')
            .populate('userTheaters')
            .select('-password').exec()
            
        if (response) {
            res.status(201).send({
                success: true,
                message: "User updation with show request removal was success.",
                data: response
            })
        }
        else {
            res.status(404).send({
                success: false,
                message:  "User updation with show request removal failed.",
            })
        }
    }
    catch (err) {
        res.status(404).send({
            success: false,
            message: "User updation with show request removal failed in DB end.",
        })
    }
})

module.exports = router;