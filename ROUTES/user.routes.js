const express = require('express');
const { register, login, getAllRoles, getAllAdmins, getAllUsers, getAllCoaches } = require('../CONTROLLERS/user.controller');
const { SIGN_UP, SIGN_IN, GET_ALL, GET_ALL_ADMINS, GET_ALL_USERS, GET_ALL_COACHES } = require('./routeConstants');
const authMiddleware = require('../MIDDLEWARES/AuthMiddleware'); // Import the authMiddleware

const router = express.Router();

// Apply authMiddleware to protect the routes that need authentication
router.post(SIGN_UP, register);
router.post(SIGN_IN, login);

// Protected routes (add authMiddleware to these routes)
router.post(GET_ALL, authMiddleware, getAllRoles);
router.post(GET_ALL_ADMINS, authMiddleware, getAllAdmins);
router.post(GET_ALL_USERS, authMiddleware, getAllUsers);
router.post(GET_ALL_COACHES, authMiddleware, getAllCoaches);

module.exports = router;
