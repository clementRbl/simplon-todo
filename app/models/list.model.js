const mongoose = require('mongoose');
const schema = mongoose.Schema;

const listShema = schema({
  name: {type: String, default: '', required: true},
  position: {type: Number, default: 0, required: false},
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'}
}, {timestamps: true});


const List = mongoose.model('list', listShema);

module.exports = List;