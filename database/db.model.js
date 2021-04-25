const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    currentType: {
        type: String
    }

});

const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;