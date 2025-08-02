import express from 'express';

import { getProfile } from '../controllers/userControllers.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.route('/me').get(auth, getProfile);

export default router;
