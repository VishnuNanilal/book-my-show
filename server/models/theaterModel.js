const mongoose = require('../configurations/DBConfig')

const theaterModel = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    screen_num: Number,
    seat_num: Number,
    timings: [{
        time:{
            type: String,
            required: true
        },
        bookedSeats: [{
            type: Number,
            required: true
        }]
    }],
    price: Number
})

module.exports = mongoose.model('theaters', theaterModel)