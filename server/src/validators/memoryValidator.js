import { z } from "zod";

const createMemorySchema = z.object({
    title: z
        .string()
        .min(3, "Title must be at least 3 characters"),

    description: z
        .string()
        .min(3, "Description must be at least 3 characters"),

    date: z.iso.date(),

    mood: z
        .string()
        .optional(),

    location: z
        .string()
        .optional(),

    song: z
        .string()
        .optional(),

    photos: z
        .array(z.string())
        .optional(),

    videos: z
        .array(z.string())
        .optional()
});

const updateMemorySchema = z.object({
    title: z
        .string()
        .min(3, "Title must be at least 3 characters")
        .optional(),

    description: z
        .string()
        .min(3, "Description must be at least 3 characters")
        .optional(),

    date: z.iso.date()
    .optional(),

    mood: z
        .string()
        .optional(),

    location: z
        .string()
        .optional(),

    song: z
        .string()
        .optional(),

    photos: z
        .array(z.string())
        .optional(),

    videos: z
        .array(z.string())
        .optional()
})

export {
    createMemorySchema,
    updateMemorySchema
};