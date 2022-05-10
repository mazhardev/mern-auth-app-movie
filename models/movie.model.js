const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoteSchema = mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId
    },
    movieTitle: {
        type: String,
        required: true
    },
    movieDescription: {
        type: String,
        required: true
    },
    movieImageUrl: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Movies', NoteSchema);
