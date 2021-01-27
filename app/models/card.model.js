const mongoose = require('mongoose');
const schema = mongoose.Schema;

const cardShema = schema({
  content: {type: String, required: true},
  color: {type: String, default: "#fff", required: true},
  position: {type: String, default: 0, required: true},
  
}, {timestamps: true});


const Card = mongoose.model('card', cardShema);

module.exports = Card;