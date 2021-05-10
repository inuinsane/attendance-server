import express from 'express';
import User from '../models/User.js';
import { Login, Logout, Register } from '../controllers/AuthController.js';

const router = express.Router();

// @decs    Register new User
// @route   POST /auth
// @access  Public
router.post('/', Register);

// @decs    User Login
// @route   POST /auth/login
// @access  Public
router.post("/login", Login);


// @decs    Logout current user
// @route   POST /auth/logout
// @access  User only
router.get("/logout", Logout);


export default router;