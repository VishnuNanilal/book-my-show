const mongoose = require('../configurations/DBConfig')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    first_name: {
        type: String,
    },
    last_name: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    userMovies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "movies"
    }],
    userTheaters: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "theaters"
    }],
    showRequests: [{
        showid: {type: mongoose.Schema.Types.ObjectId,
        ref: "shows"},
        theaterid: {type: mongoose.Schema.Types.ObjectId,
            ref: "theaters"
        }
    }],
    dob: String,
    place: String,
    profile_pic: String
})

module.exports = mongoose.model("users", userSchema)