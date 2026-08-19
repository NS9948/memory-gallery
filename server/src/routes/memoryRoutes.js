import { Router } from "express";
import { createMemoryController, deleteMemoryController, getMemoriesController, getMemoryController, updateMemoryController } from "../controllers/memoryController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validate.js";
import {createMemorySchema, updateMemorySchema} from "../validators/memoryValidator.js";

const router = Router()

router.use(authMiddleware)

router.post("/",validate(createMemorySchema), createMemoryController)
router.get("/",validate(updateMemorySchema), getMemoriesController)
router.get("/:memoryId", getMemoryController)
router.patch("/:memoryId", updateMemoryController)
router.delete("/:memoryId", deleteMemoryController)

export default router;