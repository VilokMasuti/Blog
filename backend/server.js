import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
dotenv.config();

const app = express();


app.use(express.json());
app.use(cookieParser());


app.get("/", (req, res) => {
  res.json({ message: "BlogHub Started!" })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

