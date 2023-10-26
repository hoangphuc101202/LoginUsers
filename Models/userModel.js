const mongoose = require('mongoose');
const md5 = require('md5');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String
    },
    fullname: {
        type: String,
        required: true
    },
    gender: {
        type: String
    },
    birthday: {
        type: Date,
    }
})
const userModel = mongoose.model('User', userSchema);
module.exports = userModel;