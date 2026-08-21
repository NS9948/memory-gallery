import { createMedia, updateMedia, getMedia, deleteMedia } from "../services/mediaServices.js";
import { uploadToS3 } from "../services/s3Services.js";

const createMediaController = async (req, res, next) => {
    try {
        const files = req.files;

        if (!files || files.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No media files provided"
            });
        }

        const media = [];

        for (const file of files) {
            const key = await uploadToS3(file, req.user.id);

            const type = file.mimetype.startsWith("image/")
                ? "image"
                : "video";

            const createdMedia = await createMedia({
                key,
                type,
                createdBy: req.user.id
            });

            media.push(createdMedia);
        }

        return res.status(201).json({
            success: true,
            message: "Media uploaded successfully.",
            media
        });
    } catch (error) {
        next(error);
    }
};

const updateMediaController = async (req, res, next) => {
    try {
        const { mediaId } = req.params;

        const updates = {
            description: req.body.description
        };

        const media = await updateMedia({
            mediaId,
            userId: req.user.id,
            updates
        });

        if (!media) {
            return res.status(404).json({
                success: false,
                message: "Media not found."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Media updated successfully.",
            media
        });
    } catch (error) {
        next(error);
    }
};

const getMediaController = async (req, res, next) => {
    try {
        const media = await getMedia({
            userId: req.user.id
        });

        return res.status(200).json({
            success: true,
            media
        });
    } catch (error) {
        next(error);
    }
};

const deleteMediaController = async (req, res, next) => {
    try {
        const {mediaId} = req.params
        const media = await deleteMedia({
            mediaId,
            userId: req.user.id
        })

        if(!media) {
            return res.status(404).json({
                success: false,
                message: "Media not found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Media deleted successfully.",
            media
        })
    } catch (error) {
        next(error)
    }
}

export {
    createMediaController,
    updateMediaController,
    getMediaController,
    deleteMediaController
};