import dotenv from 'dotenv';
import express from 'express';
import {
  getMe,
  login,
  logout,
  register,
} from '../controllers/authController.js';
import { auth } from '../middleware/auth.js';
import {
  loginValidation,
  registerValidation,
  validate,
} from '../middleware/validation.js';
const router = express.Router();
dotenv.config();
router.post('/register', registerValidation, validate, register);
router.post('/login', loginValidation, validate, login);
router.post('/logout', auth, logout);
router.get('/me', auth, getMe);
export default router;
