const mongoose = require('mongoose');
// const problem = require('./contributerModel');
const contestSchema = new mongoose.Schema({
    contestName: {
        type: String,
        required: true
    },
    writers: [{
        type: String,
        required: true
    }],
    startTime: {
        type: Date,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    questions: [[{
        type: String,
        required: true
    }]]
});

const Contest = mongoose.model('Contest', contestSchema);

module.exports = Contest;