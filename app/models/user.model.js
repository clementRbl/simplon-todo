const mongoose = require('mongoose');
const schema = mongoose.Schema;
require('../models/list.model');

const userSchema = schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
}, {timestamps: true});


const User = mongoose.model('user', userSchema);

module.exports = User;