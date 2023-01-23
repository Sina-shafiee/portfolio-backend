const express = require('express');
const router = express.Router();

const protected = require('../middleware/auth');
const { login, register, getUser } = require('../controller/user');

router.post('/login', login);
router.get('/me', protected, getUser);

// router.post('/register', register);

module.exports = router;
