const mongoose = require('mongoose');
const schema = mongoose.Schema;

const tagShema = schema({
  name: {type: String, default: 'normal', required: true},
  color: {type: String, default: '#fff', required: true},
  card: {type: mongoose.Schema.Types.ObjectId, ref: 'card',required: true}
}, {timestamps: true});


const Tag = mongoose.model('tag', tagShema);

module.exports = Tag;