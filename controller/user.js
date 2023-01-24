const User = require('../model/user');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// generate jwt token
const jwtGenerator = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

/**
 * @desc login user
 * @endpoint POST /api/auth/login
 * @access Public
 */
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // generate new token
  const token = jwtGenerator(user._id);

  if (user && (await bcrypt.compare(password, user.password))) {
    return res.status(200).json({ data: user, token });
  }
  res.status(400);
  throw new Error('Wrong credential');
});
/**
 * @desc login user
 * @endpoint POST /api/auth/login
 * @access somehow i don't want anyone to be able to create account right now..
 *  i hope one day i come back and add some features like roles[admin, user etc...] :D
 */
const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // creating salt
  const salt = await bcrypt.genSalt(10);
  // hashing password
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({ name, email, password: hashedPassword });

  // generate new token
  const token = jwtGenerator(user._id);

  res.status(200).json({ data: user, token });
});

/**
 * @desc login user
 * @endpoint POST /api/auth/login
 * @access Private
 */
const getUser = asyncHandler(async (req, res) => {
  const user = req.user;

  if (!user) {
    res.status(401);
    throw new Error('Not Authorized');
  }
  res.status(200).json({ user });
});

/**
 * @desc login user
 * @endpoint POST /api/auth/login
 * @access Private
 */
const updateUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { name } = req.body;
  const userID = _id.toString();

  const updatedUser = await User.findByIdAndUpdate(
    userID,
    { name },
    {
      new: true
    }
  ).select('-password');

  res.status(200).json({ data: updatedUser });
});

module.exports = { login, register, getUser, updateUser };
