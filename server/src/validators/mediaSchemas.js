import { z } from "zod";

const updateMediaSchema = z.object({
    description: z
        .string()
        .max(1000, "Description cannot exceed 1000 characters")
});

export {
    updateMediaSchema
};