let mongoose = require("mongoose")

const bookingsSchema = new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    showid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "shows",
        required: true
    },
    theaterid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "theaters",
        required: true
    },
    time: {
        type: String,
        required: true
    },
    bookedSeats: [{
        type: Number,
        required: true
    }],
    transactionid: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model("bookings", bookingsSchema)