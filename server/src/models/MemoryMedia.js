import mongoose, { model, Schema } from "mongoose";

const memoryMediaSchema = new Schema(
    {
        memoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Memory",
            required: true,
        },

        mediaId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Media",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

memoryMediaSchema.index(
    { memoryId: 1, mediaId: 1 },
    { unique: true }
);

const MemoryMedia = model("MemoryMedia", memoryMediaSchema);

export default MemoryMedia;