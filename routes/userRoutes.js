const express = require('express');
const { signUp, login, getUser } = require('../controllers/userController')
const router = express.Router();
const passport = require('../middleware/auth');
const { jwtAuthMiddleware } = require('../middlewares/jwt');
require('dotenv').config();

const localAuthMid = passport.authenticate('local', {session: false});

// Create a new user
router.post('/signup', signUp);

// Login
router.post('/login', localAuthMid, login);

// get current user profile
router.get('/userProfile', jwtAuthMiddleware, getUser);


module.exports = router;