import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import connectDB from './db/database.js';
import authRoutes from './routes/authRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import userRoutes from './routes/userRoutes.js';
dotenv.config();
const app = express();
connectDB();
// Security middleware
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
// CORS
// CORS - Allow both React dev server ports
app.use(
  cors({
    origin: [
      'http://localhost:5173', // Vite default
      process.env.FRONTEND_URL,
    ].filter(Boolean), // Remove any undefined values
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/users', userRoutes);
app.get('/', (req, res) => {
  res.json({ message: 'BlogHub Started!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
