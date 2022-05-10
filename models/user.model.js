const mongoose = require('mongoose')

const model = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin']
    },
    addressDetails:
    {
        street: {
            type: String,
        },
        city: {
            type: String,
        },
        zip: {
            type: String,
        },
        state: {
            type: String
        }
    }
    ,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = new mongoose.model("UserOfMovieApp", model)