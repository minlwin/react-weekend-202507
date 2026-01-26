import z from 'zod'

export const SignInSchema = z.object({
    "email" : z.email({error : "Please enter valid email for login"}),
    "password" : z.string().nonempty("Please enter password.")
})

export type SignInForm = z.infer<typeof SignInSchema>

export const SignUpSchema = z.object({
    "name" : z.string().nonempty("Please enter your name"),
    "email" : z.email({error : "Please enter valid email for login"}),
    "password" : z.string().nonempty("Please enter password")    
})

export type SignUpForm = z.infer<typeof SignUpSchema>

export type Role = 'Admin' | 'Member'

export type LoginUser = {
    name : string
    email : string
    role : Role
}

export type AuthResult = LoginUser & {
    accessToken : string
    refreshToken : string
}