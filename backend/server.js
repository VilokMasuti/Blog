import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import connectDB from './db/database.js';
import authRoutes from './routes/authRoutes.js';
dotenv.config();
const app = express();
connectDB();
// Security middleware
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.get('/', (req, res) => {
  res.json({ message: 'BlogHub Started!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
