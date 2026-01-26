"use client"

import { signInAction } from "@/lib/actions/anonymous/auth.action"
import FormsInput from "@/components/fields/forms-input"
import { Button } from "@/components/ui/button"
import { LogIn, UserPlus } from "lucide-react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { SignInForm, SignInSchema } from "@/lib/schema/anonymous/auth.schema"
import { safeCall } from "@/lib/utils"

export default function SignInFormComponent() {

    const form = useForm<SignInForm>({
        defaultValues: {
            email: "",
            password: ""
        }, 
        resolver: zodResolver(SignInSchema)
    })

    async function submit(form: SignInForm) {
        safeCall(async () => await signInAction(form))
    }

    return (
        <form onSubmit={form.handleSubmit(submit)} className="space-y-6">
            
            <FormsInput control={form.control} name="email" label="Email" />
            <FormsInput control={form.control} name="password" type="password" label="Password" />
            
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