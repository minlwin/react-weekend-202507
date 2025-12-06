import z from "zod";

export const SignInSchema = z.object({
    username: z.string().nonempty("Please enter email for login."),
    password: z.string().nonempty("Please enter password")
})

export type SignInForm = z.infer<typeof SignInSchema>

export const SignUpSchema = z.object({
    name: z.string().nonempty("Please enter member name."),
    username: z.string().nonempty("Please enter email for login."),
    password: z.string().nonempty("Please enter password")
})

export type SignUpForm = z.infer<typeof SignUpSchema>

export type AuthResult = {
    name: string
    email: string
    role: "Admin" | "Member"
    accessToken: string
    refreshToken: string
}