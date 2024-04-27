const router = require('express').Router()
const Show = require('../models/showModel')

router.post('/add-show', async (req, res)=>{
    try{
        let response = await Show.create(req.body)
        if(response){
            res.status(201).send({
                success: true,
                message: "Show added to DB",
                data: response
            })
        }
        else{
            res.status(404).send({
                success: false,
                message: "Show addition failed"
            })
        }
    }
    catch(err){
        res.status(404).send({
            success: false,
            message: "Show addition failed on DB end"
        })
    }
})

//Fetch all unapproved shows
router.get('/unapproved', async (req, res)=>{
    try{
        let response = await Show.find({isApproved: false})
        if(response){
            res.status(201).send({
                success: true,
                message: "Unapproved shows fetched.",
                data: response
            })
        }
        else{
            res.status(404).send({
                success: false,
                message: "Unapproved shows fetch failed."
            })
        }
    }
    catch(err){
        res.status(404).send({
            success: false,
            message: "Unapproved shows fetched in DB end."
        })
    }
})

//Fetch all approved shows
router.get('/approved', async (req, res)=>{
    try{
        let response = await Show.find({isApproved: true})
        if(response){
            res.status(201).send({
                success: true,
                message: "Unapproved shows fetched.",
                data: response
            })
        }
        else{
            res.status(404).send({
                success: false,
                message: "Unapproved shows fetch failed."
            })
        }
    }
    catch(err){
        res.status(404).send({
            success: false,
            message: "Unapproved shows fetched in DB end."
        })
    }
})

router.get('/:showid', async (req, res)=>{
    try{
        let response = await Show.findById(req.params.showid)
        if(response){
            res.status(201).send({
                success: true,
                message: "Show fetched",
                data: response
            })
        }
        else{
            res.status(404).send({
                success: false,
                message: "Show fetch failed"
            })
        }
    }
    catch(err){
        res.status(404).send({
            success: false,
            message: "Show fetch failed on DB end"
        })
    }
})

//add theater to the current show theaterslist. 
router.patch('/add-theater/:showid', async (req, res)=>{
    try{
        const show = await Show.findById(req.params.showid);
        if (show && show.theaterIds.includes(req.params.theaterId)) {
            res.send(201).status({
                success: true,
                message: "Duplicate addition ignored"
            })
            return
        }

        let response = await Show.findByIdAndUpdate(req.params.showid, 
            {$push: {theaterIds: req.body.theaterid}}, {new: true})
        if(response){
            res.status(201).send({
                success: true,
                message: "TheaterId added to Show",
                data: response
            })
        }
        else{
            res.status(404).send({
                success: false,
                message: "TheaterId adding to Show failed"
            })
        }
    }
    catch(err){
        res.status(404).send({
            success: false,
            message: "TheaterId adding to Show failed in DB end"
        })
    }
})

router.patch(`/approve/:showid`, async (req, res)=>{

    try{
        let response = await Show.findByIdAndUpdate(req.params.showid, 
            {$set: {isApproved: true}}, {new: true})
        if(response){
            res.status(201).send({
                success: true,
                message: "Show approved",
                data: response
            })
        }
        else{
            res.status(404).send({
                success: false,
                message: "Show approval failed"
            })
        }
    }
    catch(err){
        res.status(404).send({
            success: false,
            message: "Show approval failed in DB end"
        })
    }
})

router.delete('/:showid', async (req, res)=>{
    try{
        let response = await Show.findByIdAndDelete(req.params.showid)
        if(response){
            res.status(201).send({
                success: true,
                message: "Show deleted",
                data: response
            })
        }
        else{
            res.status(404).send({
                success: false,
                message: "Show deletion failed"
            })
        }
    }
    catch(err){
        res.status(404).send({
            success: false,
            message: "Show deletion failed on DB end"
        })
    }
})

module.exports = router;