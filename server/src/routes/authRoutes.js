import { Router } from "express";
import { validate } from "../middleware/validate.js";
import { loginSchema, registerSchema } from "../validators/authValidator.js";
import { getCurrentUserController, loginController, registerController } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router()

router.post("/register", validate(registerSchema), registerController)

router.post("/login", validate(loginSchema), loginController)

router.get("/me", authMiddleware, getCurrentUserController)

export default router;