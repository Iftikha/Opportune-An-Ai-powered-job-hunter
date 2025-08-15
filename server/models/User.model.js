const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required : [true, 'Please provide a name.'],
        trim: true,
    },
    email: {
        type: String,
        required : [true, 'Please provide an email.'],
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required : [true, 'Please provide a password.'],
        trim: true,
    },
    accountType: {
        type: String,
        required: true,
        enum: ['employeer', 'employee'],
        default: 'employee',
    },
    gender: {
        type: String,
        enum: ['Male', 'Female'],
        required: true,
        default: 'Male',
    },
    isVerified: {
        type: Boolean,
        required: true,
        default: false,
    }
}, {timestamps: true});

const User  = mongoose.model('User', userSchema);

module.exports = User;