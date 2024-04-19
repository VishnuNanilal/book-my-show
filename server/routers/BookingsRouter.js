const router = require('express').Router()
const stripe = require('stripe')(process.env.stripe_key)
const JWTAuthMiddleWare = require('../MiddleWares/JWTAuthMW')
const Booking = require('../models/bookingsModel')

router.post('/make-payment', JWTAuthMiddleWare, async (req, res) => {
    try{
        let {token, amount} = req.body
        const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: 'inr',
        });
        
        if(paymentIntent){

          const transactionId = paymentIntent.client_secret;
          
          res.send({
            success: true,
            message: "Payment successful",
            data: transactionId
          })
        }
        else{
          res.status(404).send({
            success: false, 
            message: "Payment failed"
          })
        }
    }
    catch(err){
      res.status(404).send({
        success: false,
        message: "Payment failed on Sprite end."
      })
    }
})

router.post('/book-show', async (req, res)=>{
  console.log("ooo",req.body)
  try{
    let response = await Booking.create(req.body)

    if(response){
      res.status(201).send({
        success: true,
        message: "Booking successful",
        data: response
      })
    }
    else{
      res.status(404).send({
        success: false,
        message: "Booking failed",
      })
    }
  }
  catch(err){
    res.status(404).send({
      success: false,
      message: "Booking failed on DB end."
    })
  }
})

router.get('/get-bookings/:userid', async (req, res)=>{
  try{
    let response = await Booking.find({userid: req.params.userid})
    if(response){
      res.status(201).send({
        success: true,
        message: "Users bookings fetched",
        data: response
      })
    }
    else{
      res.status(404).send({
        success: false,
        message: "Users bookings fetching failed.",
      })
    }
  }
  catch(err){
    res.status(404).send({
      success: false,
      message: "Users booking fetch failed on DB end."
    })
  }
})

module.exports = router


    // try {
    //     const response = await 
    //     if (response) {
    //         res.status(201).send({
    //             success: true,
    //             message: 
    //             data: 
    //         })
    //     }
    //     else {
    //         res.status(404).send({
    //             success: false,
    //             message: 
    //         })
    //     }
    // }
    // catch (err) {
    //     res.status(404).send({
    //         success: false,
    //         message: 
    //     })
    // }

/*{  TOKEN 
    id: 'tok_1P6hi7SJ2B5Vx6848gTY2fXm',
    object: 'token',
    card: {
      id: 'card_1P6hi7SJ2B5Vx684BcgSaHmo',
      object: 'card',
      address_city: null,
      address_country: null,
      address_line1: null,
      address_line1_check: null,
      address_line2: null,
      address_state: null,
      address_zip: null,
      address_zip_check: null,
      brand: 'Visa',
      country: 'US',
      cvc_check: 'unchecked',
      dynamic_last4: null,
      exp_month: 12,
      exp_year: 2027,
      funding: 'credit',
      last4: '4242',
      name: 'vishnunlal@gmail.com',
      networks: [Object],
      tokenization_method: null,
      wallet: null
    },
    client_ip: '103.155.223.1',
    created: 1713395775,
    email: 'vishnunlal@gmail.com',
    livemode: false,
    type: 'card',
    used: false
  }
  /*
*/

