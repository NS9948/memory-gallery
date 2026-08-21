import Media from "../models/Media.js";
import { deleteFromS3, getSignedMediaUrl } from "./s3Services.js";

const createMedia = async ({
    key,
    type,
    description,
    createdBy
}) => {
    try {
        const media = await Media.create({
            key,
            type,
            description,
            createdBy
        });

        return media;
    } catch (error) {
        throw error;
    }
};

const getMedia = async ({ userId }) => {
    try {
        const media = await Media.find({
            createdBy: userId
        });

        const mediaWithUrls = await Promise.all(
            media.map(async (item) => {
                const url = await getSignedMediaUrl(item.key);

                return {
                    ...item.toObject(),
                    url
                };
            })
        );

        return mediaWithUrls;
    } catch (error) {
        throw error;
    }
};

const updateMedia = async ({ mediaId, userId, updates }) => {
    try {
        const media = await Media.findOneAndUpdate(
            {
                _id: mediaId,
                createdBy: userId
            },
            updates,
            {
                new: true
            }
        );

        return media;
    } catch (error) {
        throw error;
    }
};

const deleteMedia = async ({mediaId, userId}) => {
    try {
        const media = await Media.findOne({
            _id: mediaId,
            createdBy: userId
        })

        if(!media) return null

        await deleteFromS3(media.key)

        await media.deleteOne()

        return media
    } catch (error) {
        throw error
    }
}

export {
    createMedia,
    getMedia,
    updateMedia,
    deleteMedia
};