const express = require('express');
const { signUp, login, getUser, updateUser } = require('../controller/userController')
const router = express.Router();
const passport = require('../middleware/auth');
const { jwtAuthMiddleware } = require('../middleware/jwt');
require('dotenv').config();

const localAuthMid = passport.authenticate('local', {session: false});

// Create a new user
router.post('/signup', signUp);

// Login
router.post('/login', localAuthMid,  login);

// get current user profile
router.get('/profile', jwtAuthMiddleware, getUser);

//update user profile
router.put('/update', jwtAuthMiddleware, updateUser);


module.exports = router;