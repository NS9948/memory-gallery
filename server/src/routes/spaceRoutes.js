import { Router } from "express";

import {
    createSpaceController,
    getMySpaceController,
    joinSpaceController
} from "../controllers/spaceController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

router.post("/", authMiddleware, createSpaceController);

router.post("/join", authMiddleware, joinSpaceController);

router.get("/me", authMiddleware, getMySpaceController)

export default router;