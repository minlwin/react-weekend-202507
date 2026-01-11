import z from 'zod'

export const SignUpSchema = z.object({
    "name" : z.string().nonempty("Please enter your name"),
    "email" : z.email({error : "Please enter valid email for login"}),
    "password" : z.string().nonempty("Please enter password")    
})

export type SignUpFormType = z.infer<typeof SignUpSchema>