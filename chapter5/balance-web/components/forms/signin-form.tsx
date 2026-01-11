"use client"

import { signInAction } from "@/lib/actions/signin-action"
import FormsInput from "../fields/forms-input"
import { Button } from "../ui/button"
import { LogIn, UserPlus } from "lucide-react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { SignInFormType, SignInSchema } from "@/lib/schema/signin-schema"

export default function SignInForm() {

    const form = useForm<SignInFormType>({
        defaultValues: {
            email: "",
            password: ""
        }, 
        resolver: zodResolver(SignInSchema)
    })


    return (
        <form onSubmit={form.handleSubmit(signInAction)} className="space-y-6">
            
            <FormsInput control={form.control} name="email" label="Email" />
            <FormsInput control={form.control} name="password" label="Password" />
            
            <div className="space-x-2">
                <Button type="submit">
                    <LogIn /> Sign In
                </Button>

                <Button type="button" variant='outline' asChild>
                    <Link href="/signup">
                        <UserPlus /> Sign Up
                    </Link>
                </Button>
            </div>
        </form>
    )
}