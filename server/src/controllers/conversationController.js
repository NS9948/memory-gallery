import { createConversation } from "../services/conversationService.js"

const createConversationController = async (req, res, next) => {
    try {
        const { memoryId, mediaId } = req.params 

        const conversation = await createConversation({
            memoryId,
            mediaId,
            userId: req.user.id
        })

        if(!conversation) {
            return res.status(404).json({
                success: false,
                message: "Memory or media not found."
            })
        }

        return res.status(200).json({
            success: true,
            message: "Conversation created successfully.",
            conversation
        })

    } catch (error) {
        next(error)
    }
}

export {
    createConversationController
}