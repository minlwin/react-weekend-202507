import z from 'zod'

export const SignInSchema = z.object({
    "email" : z.email({error : "Please enter valid email for login"}),
    "password" : z.string().nonempty("Please enter password.")
})

export type SignInFormType = z.infer<typeof SignInSchema>