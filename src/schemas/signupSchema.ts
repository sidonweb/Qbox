import {z} from "zod"


export const usernameValidation = z
    .string()
    .min(2, "Minimum 2 characters required")
    .max(30, "Maximum 30 characters allowed")
    .regex(/^[a-zA-Z0-9_]+$/, "Special characters not allowed")


export const signUpSchema = z.object({
    username: usernameValidation,
    email: z.string().email({message: "Valid email required"}),
    password: z.string().min(6, {message:"Minimum 6 character required"})
})