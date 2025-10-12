import z from "zod";

export const SignInSchema = z.object({
    email: z.email().nonempty("Please enter valid email address."),
    password: z.string().nonempty("Please enter password")
})

export type SignInForm = z.infer<typeof SignInSchema>

export type SignInResponse = {
    name: string
    role: string
}

export type SignInResult = {
    success: boolean
    message: string
}