const express = require('express');
const { register, login } = require('../CONTROLLERS/user.controller'); // Fix the import path
const { SIGN_UP, SIGN_IN } = require('./routeConstants');

const router = express.Router();

router.post(SIGN_UP, register);
router.post(SIGN_IN, login);

module.exports = router; // Use module.exports instead of export default
