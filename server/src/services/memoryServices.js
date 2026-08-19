import Memory from "../models/Memory.js"

const createMemory = async({
    title,
    description,
    date,
    mood,
    location,
    song,
    photos,
    videos,
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
            photos,
            videos,
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

        return memory
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