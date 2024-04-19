const mongoose = require('mongoose')

const showSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref:"users"},
    movieId : {type: mongoose.Schema.Types.ObjectId, ref:"movies"},
    theaterIds: [{type: mongoose.Schema.Types.ObjectId, ref:"theaters"}],
    isApproved: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('shows', showSchema)