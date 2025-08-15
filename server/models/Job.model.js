const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    companyName: {
        type: String,
        required: true,
        trim: true,
    },
    jobTitle: {
        type: String,
        required: [true, "Job title is required."],
        trim: true
    },
    applications: {
        type: Number,
        default: 0,
        min: 0,
    },
    skillsRequired: {
        type: [String],
        required: [true, "Job skills should be specified."],
        trim: true,
    },
    experienceLevel: {
        type: String,
        required: true,
        enum: ['Internee', 'Freashy', 'less than year', '1 - 2 years', '2 - 4 years', '5 - 7 years', '7+ years'],
        desfault: 'less than year',
        trim: true,
    },
    jobDescription: {
        type: String,
        required: true,
        trim: true,
    },
    location: {
        type: String,
        required: true,
        trim: true,
    },
    jobType: {
        type: String,
        enum: ['Remote', 'On-site', 'Both'],
        default: 'On-site',
        required: true,
    }
}, { timestamps: true});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;