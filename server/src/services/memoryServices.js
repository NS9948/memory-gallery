import Memory from "../models/Memory.js"
import MemoryMedia from "../models/MemoryMedia.js";
import Media from "../models/Media.js";
import { getSignedMediaUrl } from "./s3Services.js";

const createMemory = async({
    title,
    description,
    date,
    mood,
    location,
    song,
    createdBy
}) => {
    try {
    
        const memory = await Memory.create({
            title,
            description,
            date,
            mood,
            location,
            song,
            createdBy
        })

        return memory


    } catch (error) {
        throw error
    }
}

const getMemories = async ({userId}) => {
    try {
        const memories = await Memory.find({
            createdBy: userId
        })
    
        return memories
    } catch (error) {
        throw error
    }
}

const getMemory =  async ({userId, memoryId}) => {
    try {
        const memory = await Memory.findOne({
            createdBy: userId,
            _id: memoryId
        })

        if (!memory) {
            return null;
        }

        const memoryMedia = await MemoryMedia.find({
            memoryId: memory._id
        });
        
        const mediaIds = memoryMedia.map((item) => item.mediaId);
        
        const media = await Media.find({
            _id: { $in: mediaIds },
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
        
        return {
            ...memory.toObject(),
            media: mediaWithUrls
        };
    } catch (error) {
        throw error
    }
}

const updateMemory = async ({memoryId, userId, updates}) => {
    try {
        const memory = await Memory.findOneAndUpdate(
            {
                _id: memoryId,
                createdBy: userId
            },
            updates
            ,{
                new: true
            }
        )

        return memory
    } catch (error) {
        throw error
    }
}

const deleteMemory = async ({memoryId, userId}) => {
    try {
        const memory = await Memory.findOneAndDelete({
            _id: memoryId,
            createdBy: userId
        })

        return memory
    } catch (error) {
        throw error
    }
}

export {
    createMemory,
    getMemories,
    getMemory,
    updateMemory,
    deleteMemory

}