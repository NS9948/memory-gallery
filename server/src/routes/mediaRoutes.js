import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
    createMediaController,
    deleteMediaController,
    getMediaController,
    updateMediaController,
    
} from "../controllers/mediaControllers.js";
import upload from "../middleware/uploadMiddleware.js";
import { updateMediaSchema } from "../validators/mediaSchemas.js";
import { validate } from "../middleware/validate.js";

const router = Router();

router.post(
    "/upload",
    authMiddleware,
    upload.array("media", 20),
    createMediaController
);

router.patch(
    "/:mediaId",
    authMiddleware,
    validate(updateMediaSchema),
    updateMediaController
);

router.get(
    "/",
    authMiddleware,
    getMediaController
);

router.delete(
    "/:mediaId",
    authMiddleware,
    deleteMediaController
);

export default router;