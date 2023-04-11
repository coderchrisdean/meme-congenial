const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
    },
    savedBooks: [
        {
            bookId: {
                type: String,
                required: true,
                unique: true,
            },
            authors: [String],
            description: String,
            title: String,
            image: String,
            link: String,
        },
    ],
});


module.exports = User = mongoose.model('User', UserSchema);

