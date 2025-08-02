import express from "express";
import {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
  getMyBlogs, // ✅ new controller for logged-in user's blogs
} from "../controllers/blogController.js";

import { blogValidation, validate } from "../middleware/validation.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// Public routes
router.route("/").get(getBlogs);
router.route("/:id").get(getBlog);

// Protected routes (require login)
router.post("/", auth, blogValidation, validate, createBlog);
router.put("/:id", auth, blogValidation, validate, updateBlog);
router.delete("/:id", auth, deleteBlog);

router.get("/user/me", auth, getMyBlogs);

export default router;
