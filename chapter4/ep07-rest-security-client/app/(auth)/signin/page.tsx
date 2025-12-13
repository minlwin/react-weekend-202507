'use client'

import { Button } from "@/components/ui/button"
import FormsInput from "@/components/widgets/forms-input"
import { signInAction } from "@/lib/model/auth-actions"
import { SignInForm, SignInSchema } from "@/lib/types/auth"
import { safeCall } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { Unlock, UserPlus } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

export default function SignInPage() {
    const router = useRouter()
    const form = useForm({
        resolver: zodResolver(SignInSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const signIn = (form:SignInForm) => {
        safeCall(async () => {
            const role = await signInAction(form)
            router.replace(`/${role.toLocaleLowerCase()}`)
        })
    }

    return (
        <section className="w-3/5 space-y-6">
            <h1 className="text-3xl">Member Sign In</h1>

            <form onSubmit={form.handleSubmit(signIn)} className="space-y-4">
                <FormsInput control={form.control} path="email" 
                    label="Email" type="email" />
                <FormsInput control={form.control} path="password" 
                    label="Password" type="password" />

                <div className="space-x-2">
                    <Button type="submit">
                        <Unlock /> Sign In
                    </Button>

                    <Button asChild variant={'outline'}>
                        <Link href={'/signup'}>
                            <UserPlus /> Sign Up
                        </Link>
                    </Button>
                </div>
            </form>
        </section>  
    )
}