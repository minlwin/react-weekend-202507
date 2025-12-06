'use client'

import { Button } from "@/components/ui/button"
import FormsInput from "@/components/widgets/forms-input"
import { SignUpForm, SignUpSchema } from "@/lib/types/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { Unlock, UserPlus } from "lucide-react"
import Link from "next/link"
import { useForm } from "react-hook-form"

export default function SignUpPage() {

    const form = useForm({
        resolver: zodResolver(SignUpSchema),
        defaultValues: {
            name: "",
            username: "",
            password: ""
        }
    })

    const sinUpAction = (form:SignUpForm) => {
        console.log(form)
    }

    return (
        <section className="w-3/5 space-y-6">
            <h1 className="text-3xl">Sign Up</h1>

            <form className="space-y-4" onSubmit={form.handleSubmit(sinUpAction)}>
                <FormsInput control={form.control} path="name"
                    label="Name" />
                <FormsInput control={form.control} path="username"
                    label="Email" type="email" />
                <FormsInput control={form.control} path="password"
                    label="Password" type="password" />

                <div className="space-x-2">
                    <Button type="submit">
                        <UserPlus /> Sign Up
                    </Button>

                    <Button type="button" variant={'outline'} asChild>
                        <Link href={"/signin"}>
                            <Unlock /> Sign In
                        </Link>
                    </Button>
                </div>
            </form>
        </section>
    )
}