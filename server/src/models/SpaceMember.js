import {Schema, model} from "mongoose"

const spaceMemberSchema = new Schema({
    space: {
        type: Schema.Types.ObjectId,
        ref: "Space",
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    role:{
        type: String,
        enum: ["OWNER", "MEMBER"],
        default: "MEMBER"
    },
},
{
    timestamps: true
})

spaceMemberSchema.index({
    space: 1,
    user: 1
},
{
    unique: true
})

const SpaceMember = model("SpaceMember", spaceMemberSchema)

export default SpaceMember