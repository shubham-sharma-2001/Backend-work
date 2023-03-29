const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cpassword: {
    type: String,
    required: true,
  },
  otp: {
    type: Number,
    expires: '1m',
    index: true,
  },
});

const User = mongoose.model('USER', userSchema);

module.exports = User;
