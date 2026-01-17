"use client"

import { signUpAction } from "@/lib/actions/auth.action"
import { SignUpForm, SignUpSchema } from "@/lib/schema/auth.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import FormsInput from "@/components/fields/forms-input"
import { Button } from "@/components/ui/button"
import { LogIn, UserPlus } from "lucide-react"
import Link from "next/link"
import { safeCall } from "@/lib/utils"

export default function SignUpFormComponent() {

    const form = useForm<SignUpForm>({
        resolver: zodResolver(SignUpSchema),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    })

    async function submit(form: SignUpForm) {
        await safeCall(async () => signUpAction(form))
    }

    return (
        <form onSubmit={form.handleSubmit(submit)} className="space-y-5">
            <FormsInput control={form.control} name="name" label="User Name" />
            <FormsInput control={form.control} name="email" type="email" label="Email" />
            <FormsInput control={form.control} name="password" type="password" label="Password" />

            <div className="space-x-2">
                <Button type="submit">
                    <UserPlus /> Sign Up
                </Button>
                <Button variant='outline' asChild>
                    <Link href="/signin">
                        <LogIn /> Sign In
                    </Link>
                </Button>
            </div>
        </form>
    )
}