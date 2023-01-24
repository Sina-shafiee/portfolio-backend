const express = require('express');
const router = express.Router();

const protected = require('../middleware/auth');
const { login, register, getUser, updateUser } = require('../controller/user');

router.post('/login', login);
router.get('/me', protected, getUser);
router.patch('/update', protected, updateUser);
// router.post('/register', register);

module.exports = router;
