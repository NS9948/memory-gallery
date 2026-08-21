import {model, Schema} from "mongoose"

const mediaSchema = new Schema({
    key: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ["image", "video"],
        required: true,
    },
    description: {
        type: String,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
},{timestamps: true})

const Media = model("Media", mediaSchema)

export default Media