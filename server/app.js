const express = require('express');
var bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const controller = require('./controller/User');
app.use(cors());

require('./connection/conn');
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Hello World');
});
app.post('/signin', controller.signin);
app.post('/signup', controller.signup);
app.post('/send-otp', controller.sendotp);
app.post('/submit-otp', controller.submitotp);

app.listen(port, () => {
  console.log(`You are running at port ${port}`);
});
