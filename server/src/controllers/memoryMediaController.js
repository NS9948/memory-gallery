import { attachMediaToMemory } from "../services/memoryMediaServices.js";

const attachMediaToMemoryController = async (req, res, next) => {
    try {
        const { memoryId, mediaId } = req.params;

        const mediaMemory = await attachMediaToMemory({
            memoryId,
            mediaId,
            userId: req.user.id
        });

        if (!mediaMemory) {
            return res.status(404).json({
                success: false,
                message: "Memory or media not found."
            });
        }

        return res.status(201).json({
            success: true,
            message: "Media attached to memory successfully.",
            mediaMemory
        });
    } catch (error) {
        next(error);
    }
};

export {
    attachMediaToMemoryController
};