const mongoose = require('mongoose');

const employeerSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required : true,
        unique: true,
        ref: 'User'
    },
    companyName: {
        type: String,
        required: [true, "Please provide a company name."],
        trim: true,
    },
    logo: {
        type: String,
        trim: true,
    },
    website: {
        type: String,
        required : [true, 'Please provide a website link.'],
        trim: true,
    },
    location: {
        type: String,
        required: [true, "Please provide your location/City."],
        trim: true
    },
    Industry:{
        type: String,
        required: true,
        trim: true,
    },
    companySize: {
        type: String,
        required: true,
        enum: ['New Startup', 'less than 50 people', '50 - 100 people', '100 - 150 people', '150+ people'], 
        trim: true,
    }
}, {timestamps: true});

const Employeer  = mongoose.model('Employeer', employeerSchema);

module.exports = Employeer;