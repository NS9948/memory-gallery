import {model, Schema} from "mongoose"

const conversationSchema = new Schema({
    memoryId: {
        type: Schema.Types.ObjectId,
        ref: "Memory"
    },
    mediaId: {
        type: Schema.Types.ObjectId,
        ref: "Media"
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    lastMessageAt: {
        type: Date
    }
},{
    timestamps: true
})

const Conversation = model("Conversation", conversationSchema)

export default Conversation