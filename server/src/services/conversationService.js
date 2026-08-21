import Conversation from "../models/Conversation.js";
import Media from "../models/Media.js";
import Memory from "../models/Memory.js"

const createConversation = async ({
    memoryId,
    mediaId,
    userId
}) => {
    try {
        if ((!memoryId && !mediaId) || (memoryId && mediaId)) {
            return null;
        }
        
        let memory;
        let media;
    
        if (memoryId) {
            memory = await Memory.findOne({
                _id: memoryId,
                createdBy: userId
            });
    
            if (!memory) {
                return null;
            }
        } else {
            media = await Media.findOne({
                _id: mediaId,
                createdBy: userId
            });
    
            if (!media) {
                return null;
            }
        }
    
        const conversation = await Conversation.findOne({
            mediaId,
            memoryId,
            createdBy: userId
        })
    
        if(conversation) return conversation
    
        const conversationCreate = await Conversation.create({
            memoryId,
            mediaId,
            createdBy: userId
        })
    
        return conversationCreate
    } catch (error) {
        throw error
    }

    

}

export {createConversation}