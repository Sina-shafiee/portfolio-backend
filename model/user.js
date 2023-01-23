const mongoose = require('mongoose');
const validateEmail = require('../utils/emailChecker');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: [true, 'Email address is required'],
    validate: [validateEmail, 'Please fill a valid email address'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please fill a valid email address'
    ]
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  }
  //   role: {
  //     type: String,
  //     default: 'user',
  //     enum: ['user', 'admin']
  //   }
});

module.exports = mongoose.model('User', userSchema);
