import express from "express";

import { login, signup } from "../Controllers/AuthController.js";
import { loginValidtion, signupValidtion } from "../Middleware/AuthValidation.js";

const router = express.Router();

// Signup Route



router.post("/signup", signupValidtion, signup);

// Login Route
router.post("/login", loginValidtion, login);

export default router;
