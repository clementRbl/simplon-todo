const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const router = require('./app/router');

const PORT = process.env.PORT || 5050;
const app = express();
exports.app = app;

app.use(express.urlencoded({extended: true}));

app.use(router);
require('./app/db');


app.listen(PORT, () => {
  console.log(`Listening on ${PORT} ...`);
});
