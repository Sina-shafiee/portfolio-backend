const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const User = require('../model/user');

const protected = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // getting token from header
      token = req.headers.authorization.split(' ')[1];

      // decoding token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // append user to request
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not Authorized');
    }
  }
  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

module.exports = protected;
