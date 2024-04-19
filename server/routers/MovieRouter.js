const router = require('express').Router()
const Movie = require('../models/movieModel')

router.post('/add-movie', async (req, res) => {
    console.log("add movie request data: ", req.body.poster)
    try {
        const response = await Movie.create(req.body)
        if (response) {
            res.status(201).send({
                success: true,
                message: "Movie successfully added.",
                data: response
            })
        }
        else {
            res.status(404).send({
                success: false,
                message: "Movie addition failed."
            })
        }
    }
    catch (err) {
        res.status(404).send({
            success: false,
            message: "Err: Movie addition failed from DB end.",
        })
    }
})

router.get('/all-movies', async (req, res) => {
    try {
        const response = await Movie.find()
        if (response) {
            res.status(201).send({
                success: true,
                message: "All movies fetched.",
                data: response
            })
        }
        else {
            res.status(404).send({
                success: false,
                message: "All movies fetch failed."
            })
        }
    }
    catch (err) {
        res.status(404).send({
            success: false,
            message: "Err: All movies fetch failed from DB end.",
        })
    }
})


router.get('/:movieid', async (req, res) => {
    let { name, release_date, rating, genre, director } = req.body
    try {
        let response = await Movie.findById(req.params.movieid)

        if (response) {
            res.status(201).send({
                success: true,
                message: "Movie successfully fetched.",
                data: response
            })
        }
        else {
            res.status(404).send({
                success: false,
                message: "Movie fetching failed.",
            })
        }
    }
    catch (err) {
        res.status().send({
            success: false,
            message: "Err: Movie fetching failed on DB end.",
        })
    }
})

router.patch('/:movieid', async (req, res) => {
    let { name, release_date, rating, genre, director } = req.body
    try {
        let response = await Movie.findByIdAndUpdate(req.params.movieid, { name, release_date, rating, genre, director }, { new: true })
        console.log("response!!!", response)
        if (response) {
            res.status(201).send({
                success: true,
                message: "Movie successfully updated.",
                data: response
            })
        }
        else {
            res.status(404).send({
                success: false,
                message: "Movie updation failed.",
            })
        }
    }
    catch (err) {
        res.status().send({
            success: false,
            message: "Err: Movie updation failed on DB end.",
        })
    }
})

router.delete('/:movieid', async (req, res) => {
    try {
        let response = await Movie.findByIdAndDelete(req.params.movieid)
        if (response) {
            res.status(201).send({
                success: true,
                message: "Movie deleted from DB.",
            })
        }
        else {
            res.status(404).send({
                success: false,
                message: "Movie deletion failed.",
            })
        }
    }
    catch (err) {
        res.status(404).send({
            success: false,
            message: "Err: Movie deletion failed from DB end.",
        })
    }
})

module.exports = router