const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    image: {
        type: [String],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Post can't be empty."],
        trim: true,
    },
    likes: {
        type: Number,
        default: 0,
        min: 0
    },
}, {timestamps: true});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;