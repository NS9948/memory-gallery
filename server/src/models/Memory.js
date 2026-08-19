import { model, Schema } from "mongoose";

const memorySchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
            trim: true,
        },

        date: {
            type: Date,
            required: true,
        },

        mood: {
            type: String,
            trim: true,
        },

        location: {
            type: String,
            trim: true,
        },

        song: {
            type: String,
            trim: true,
        },

        photos: [
            {
                type: String,
            },
        ],

        videos: [
            {
                type: String,
            },
        ],

        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Memory = model("Memory", memorySchema);

export default Memory;