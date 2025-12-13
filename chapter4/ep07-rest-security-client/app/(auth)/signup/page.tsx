'use client'

import { Button } from "@/components/ui/button"
import FormsInput from "@/components/widgets/forms-input"
import { signUpAction } from "@/lib/model/auth-actions"
import { SignUpForm, SignUpSchema } from "@/lib/types/auth"
import { safeCall } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { Unlock, UserPlus } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

export default function SignUpPage() {

    const router = useRouter()

    const form = useForm({
        resolver: zodResolver(SignUpSchema),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    })

    const sinUp = async (form:SignUpForm) => {
        await safeCall(async () => {
            const result = await signUpAction(form)
            router.replace(`/${result.toLocaleLowerCase()}`)
        })
    }

    return (
        <section className="w-3/5 space-y-6">
            <h1 className="text-3xl">Sign Up</h1>

            <form className="space-y-4" onSubmit={form.handleSubmit(sinUp)}>
                <FormsInput control={form.control} path="name"
                    label="Name" />
                <FormsInput control={form.control} path="email"
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