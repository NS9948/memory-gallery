import Media from "../models/Media.js"
import Memory from "../models/Memory.js"
import MemoryMedia from "../models/MemoryMedia.js"

const attachMediaToMemory = async ({
    memoryId,
    mediaId,
    userId
}) => {
    try {
        const media = await Media.findOne({
            _id: mediaId,
            createdBy: userId
        })

        if(!media) return null

        const memory = await Memory.findOne({
            _id: memoryId,
            createdBy: userId
        })

        if(!memory) return null

        const memoryMedia = await MemoryMedia.create({
            memoryId,
            mediaId
        })

        return memoryMedia
    } catch (error) {
        throw error
    }
}

export {attachMediaToMemory}