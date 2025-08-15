const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    userID : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    jobID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending',
    },
}, { timestamps: true});

const Application = mongoose.model('Apply', applicationSchema);

module.exports = Application;