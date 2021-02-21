const User = require('../models/user.model');

exports.findUserPerEmail = (email) => {
  return User.findOne({ 'email': email }).exec();
}

exports.findUserPerId = (id) => {
  return User.findOne({ _id: id }).exec();
}