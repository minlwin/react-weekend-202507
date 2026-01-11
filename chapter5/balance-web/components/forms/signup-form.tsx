"use client"

import { signUpAction } from "@/lib/actions/signup-action"
import { SignUpFormType, SignUpSchema } from "@/lib/schema/signup-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import FormsInput from "../fields/forms-input"
import { Button } from "../ui/button"
import { LogIn, UserPlus } from "lucide-react"
import Link from "next/link"

export default function SignUpForm() {

    const form = useForm<SignUpFormType>({
        resolver: zodResolver(SignUpSchema),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    })

    return (
        <form onSubmit={form.handleSubmit(signUpAction)} className="space-y-5">
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