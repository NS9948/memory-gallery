import { createMemory, deleteMemory, getMemories, getMemory, updateMemory } from "../services/memoryServices.js"

const createMemoryController = async (req,res,next) => {
    try {
        const {
            title,
            description,
            date,
            mood,
            location,
            song,
        } = req.body

        const memory = await createMemory({
            title,
            description,
            date,
            mood,
            location,
            song,
            createdBy: req.user.id
        })

        return res.status(201).json({
            success: true,
            message: "Memory created successfully.",
            memory
        })
    } catch (error) {
        console.error(error)

        next(error)
    }
}

const getMemoriesController = async (req,res,next) => {
    try {
        const memories = await getMemories({userId: req.user.id})

        return res.status(200).json({
            success: true,
            memories
        })
        
    } catch (error) {
        console.error(error)

        next(error)
    }
}

const getMemoryController = async (req,res,next) => {
    try {
        const {memoryId} = req.params
        const memory = await getMemory({userId: req.user.id, memoryId})

        if(!memory){
            return res.status(404).json({
                success: false,
                message: "No memory found."
            })
        }

        return res.status(200).json({
            success: true,
            memory
        })
    } catch (error) {
        console.error(error)

        next(error)
    }

}

const updateMemoryController = async(req,res,next) => {
    try {

        const {memoryId} = req.params
        const updates = req.body
        const memory = await updateMemory({
            userId: req.user.id,
            memoryId,
            updates
        })

        if(!memory){
            return res.status(404).json({
                success: false,
                message: "Memory not found."
            })
        }

        return res.status(200).json({
            success: true,
            message: "Memory updated successfully.",
            memory
        })
        
    } catch (error) {
        console.error(error)

        next(error)
    }
}

const deleteMemoryController =  async (req,res,next) => {
    try {
        
        const {memoryId} = req.params
        const memory = await deleteMemory({
            memoryId,
            userId: req.user.id
        })

        if(!memory){
            return res.status(404).json({
                success: false,
                message: "Memory not found."
            })
        }

        return res.status(200).json({
            success: true,
            message: "Memory deleted successfully",
            memory
        })
    } catch (error) {
        console.error(error)

        next(error)
    }
}

export {
    createMemoryController,
    getMemoriesController,
    getMemoryController,
    updateMemoryController,
    deleteMemoryController
}