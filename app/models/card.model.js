const mongoose = require('mongoose');
const schema = mongoose.Schema;

const cardShema = schema({
  content: {type: String, required: true},
  color: {type: String, default: "#fff"},
  position: {type: String, default: 0, required: true},
  list: { type: mongoose.Schema.Types.ObjectId, ref: 'list'}
}, {timestamps: true});


const Card = mongoose.model('card', cardShema);

module.exports = Card;