import {Schema, model} from "mongoose"

const spaceSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    inviteCode: {
        type: String,
        required: true,
        unique: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    status: {
        type: String,
        enum: ["WAITING", "ACTIVE"],
        default: "WAITING",
        required: true
    }
},
{
    timestamps: true
})

const Space = model("Space", spaceSchema)

export default Space