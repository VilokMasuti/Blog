import jwt from 'jsonwebtoken';
import connectDB from '../db/database.js';
import User from '../models/User.js';


export const genrateToken = (userid) => {
  return jwt.sign({ userid }, process.env.JWT_SECRET_KEY, {
    expiresIn: '3d',
  });
};


export const setTokenRes = (user, statusCode, res) => {

  const token = genrateToken(user._id);

  const options = {
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  };

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
};

//  register
export const register = async (req, res, next) => {
  try {
    connectDB();

    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: 'User already exists' });
    }

    const user = await User.create({ name, email, password });

    //  Set cookie and  return token response
    setTokenRes(user, 201, res);
  } catch (error) {
    next(error);
  }
};

// login
export const login = async (req, res, next) => {
  try {
    connectDB();

    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: 'Please provide email and password' });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: 'Invalid credentials' });
    }

    setTokenRes(user, 200, res);
  } catch (error) {
    next(error);
  }
};

//  logout
export const logout = async (req, res, next) => {
  try {
    connectDB();

    res.cookie('token', 'none', {
      expires: new Date(Date.now() + 10 * 1000), // 10 seconds
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: 'Logout successful',
    });
  } catch (error) {
    next(error);
  }
};

//GET CURRENT USER
export const getMe = async (req, res, next) => {
  try {
    connectDB();

    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};
