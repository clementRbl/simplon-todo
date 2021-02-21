const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const schema = mongoose.Schema;
require('../models/list.model');

const userSchema = schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
  
}, {timestamps: true});

userSchema.statics.hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    } catch (error) {
        throw error
    }
}

userSchema.methods.comparePassword = function(password) {
    return bcrypt.compare(password, this.password);
}

const User = mongoose.model('user', userSchema);

module.exports = User;