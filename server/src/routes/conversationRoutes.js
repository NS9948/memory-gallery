import { Router } from "express";
import { createConversationController } from "../controllers/conversationController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router()

router.post("/memory/:memoryId", authMiddleware, createConversationController)
router.post("/media/:mediaId", authMiddleware, createConversationController)

export default router;