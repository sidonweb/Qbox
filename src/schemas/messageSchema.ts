import {z} from "zod"

export const messageSchema = z.object({
    content: z
        .string()
        .min(2, {message: "Minimum 2 charcters required"})
        .max(300, {message: "Maximum 300 characters allowed"})
})