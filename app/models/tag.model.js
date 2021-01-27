const mongoose = require('mongoose');
const schema = mongoose.Schema;

const tagShema = schema({
  name: {type: String, default: '', required: true},
  color: {type: String, default: 0, required: true},
}, {timestamps: true});


const Tag = mongoose.model('tag', tagShema);

module.exports = Tag;