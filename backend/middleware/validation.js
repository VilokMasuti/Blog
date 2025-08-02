import { body, validationResult } from "express-validator"

// Validation middleware
export const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array(),
    })
  }
  next()
}

// Auth validation rules
export const registerValidation = [
  body("name").trim().isLength({ min: 2, max: 50 }).withMessage("Name must be between 2 and 50 characters"),
  body("email").isEmail().normalizeEmail().withMessage("Please enter a valid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage("Password must contain at least one uppercase letter, one lowercase letter, and one number"),
]

export const loginValidation = [
  body("email").isEmail().normalizeEmail().withMessage("Please enter a valid email"),
  body("password").notEmpty().withMessage("Password is required"),
]

// Blog validation rules
export const blogValidation = [
  body("title").trim().isLength({ min: 3, max: 100 }).withMessage("Title must be between 3 and 100 characters"),
  body("content").trim().isLength({ min: 10 }).withMessage("Content must be at least 10 characters long"),
 ,
]
