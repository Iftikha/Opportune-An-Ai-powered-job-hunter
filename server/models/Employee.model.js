const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required : true,
        unique: true,
        ref: 'User'
    },
    logo: {
        type: String,
        trim: true,
    },
    phoneNumber: {
        type: String,
        required : [true, 'Please provide a phone number.'],
    },
    about: {
        type: String,
        required: true,
        trim: true,
    },
    location: {
        type: String,
        required: [true, "Please provide your location/City."],
    },
    skills:{
        type: [String],
        required: true,
    },
    experienceLevel: {
        type: String,
        required: true,
        enum: ['Internee', 'Freashy', 'less than year', '1 - 2 years', '2 - 4 years', '5 - 7 years', '7+ years'],
        desfault: 'less than year',
    },
    jobType: {
        type: String,
        required: true,
        enum: ['remote', 'on-site', 'both'],
        default: 'on-site'
    }
}, {timestamps: true});

const Employee  = mongoose.model('Employee', employeeSchema);

module.exports = Employee;