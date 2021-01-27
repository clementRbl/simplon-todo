const mongoose = require('mongoose');

mongoose.connect(`mongodb://simplonTodo:simplonTodo@localhost:27017/todo`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log(`connect to database OK`);
}).catch ( err => {
  console.log(err);
});