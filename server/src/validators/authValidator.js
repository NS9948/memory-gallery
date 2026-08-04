import { z } from "zod" 

const registerSchema = z.object({
    name: z.string()
            .trim()
            .min(2, "Name must be at least 2 characters long")
            .max(50, "Name must be at most 50 characters long"),
    email: z.email(),
    password: z.string()
                .min(8, "Password must be at least 8 characters long")
                .regex(/[0-9]/, "Password must contain at least one number")
                .regex(/[a-zA-Z]/, "Password must contain at least one letter")
                .regex(/[!@#$%^&*]/, "Password must contain at least one special character")
})

const loginSchema = z.object({
        email: z.email(),
        password: z.string().min(1, "Password is required")
})

export { registerSchema,loginSchema }