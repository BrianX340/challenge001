const mongoose = require('mongoose');

const Operation = new mongoose.Schema({
    concept: String,
    amount: Number,
    type: String,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Operation', Operation)