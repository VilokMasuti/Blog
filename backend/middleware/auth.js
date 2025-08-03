import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const auth = async (req, res, next) => {
  console.log('---- AUTH DEBUG ----');
  console.log('Authorization header:', req.header('Authorization'));
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('No or malformed Authorization header');
      return res.status(401).json({ message: 'No token, access denied' });
    }
    const token = authHeader.replace('Bearer ', '');
    console.log('Token extracted:', token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded JWT:', decoded);

    // FIXED THIS LINE:
    // Was: const user = await User.findById(decoded.userId).select('-password');
    const user = await User.findById(decoded.userid).select('-password');
    if (!user) {
      console.log('No user found for decoded.userid:', decoded.userid);
      return res.status(401).json({ message: 'Token is not valid' });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log('JWT verify error:', error.message);
    res.status(401).json({ message: 'Token is not valid' });
  }
};
