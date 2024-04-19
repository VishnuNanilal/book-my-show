const mongoose = require('../configurations/DBConfig')

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    poster: {
        type: String,
        required: true
    },
    release_date: {
        type: Date,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    genre: String,
    director: String
})

module.exports = mongoose.model('movies', movieSchema)