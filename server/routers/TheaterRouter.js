const router = require('express').Router()
const Theater = require('../models/theaterModel')

router.post('/add-theater', async (req, res)=>{
    try{
        let response = await Theater.create(req.body)

        if(response){
            res.status(201).send({
                success: true,
                message: "Theater successfully added.",
                data: response
            })
        }
        else{
            res.status(404).send({
                success: false,
                message: "Theater adding failed.",
            })
        }
    }
    catch(err){
        res.status(404).send({
            success: false,
            message: "Theater adding failed on DB end.",
        })
    }
})

router.get('/all-theaters', async (req, res)=>{
    try{
        let response = await Theater.find()

        if(response){
            res.status(201).send({
                success: true,
                message: "All theaters successfully fetched.",
                data: response
            })
        }
        else{
            res.status(404).send({
                success: false,
                message: "All theaters fetching failed.",
            })
        }
    }
    catch(err){
        res.status(404).send({
            success: false,
            message: "All theaters fetching failed on DB end.",
        })
    }
})

router.get('/:theaterid', async (req, res)=>{
    try{
        let response = await Theater.findById(req.params.theaterid)

        if(response){
            res.status(201).send({
                success: true,
                message: "Theater successfully fetched.",
                data: response
            })
        }
        else{
            res.status(404).send({
                success: false,
                message: "Theater fetching failed.",
            })
        }
    }
    catch(err){
        res.status(404).send({
            success: false,
            message: "Theater fetching failed on DB end.",
        })
    }
})

router.patch('/:theaterid', async (req, res) => {
    try {
        let response = await Theater.findByIdAndUpdate(req.params.theaterid, req.body, { new: true })
        if (response) {
            res.status(201).send({
                success: true,
                message: "Theater successfully updated.",
                data: response
            })
        }
        else {
            res.status(404).send({
                success: false,
                message: "Theater updation failed.",
            })
        }
    }
    catch (err) {
        res.status().send({
            success: false,
            message: "Err: Theater updation failed on DB end.",
        })
    }
})

router.delete('/:theaterid', async (req, res)=>{
    console.log(req.params.theaterid)
    try{
        let response = await Theater.findByIdAndDelete(req.params.theaterid)
        console.log("response", response)
        if(response){
            res.status(201).send({
                success: true,
                message: "Theater successfully deleted.",
                data: response
            })
        }
        else{
            res.status(404).send({
                success: false,
                message: "Theater deletion failed.",
            })
        }
    }
    catch(err){
        res.status(404).send({
            success: false,
            message: "Theater deletion failed on DB end.",
        })
    }
})

module.exports = router