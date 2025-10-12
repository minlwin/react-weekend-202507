'use client'

import FormsInput from "@/components/forms/forms-input";
import { Button } from "@/components/ui/button";
import { signInAction } from "@/lib/action/auth.action";
import { SignInForm, SignInSchema } from "@/lib/model/auth.model";
import { zodResolver } from "@hookform/resolvers/zod";
import { DoorOpen, Unlock } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function SignInPage() {

    const router = useRouter()

    const form = useForm<SignInForm>({
        resolver: zodResolver(SignInSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    async function signIn(form: SignInForm) {
        const result = await signInAction(form)

        if(result.success) {
            router.replace(`/${result.message.toLocaleLowerCase()}`)
        } else {
            toast("Sign In Error", {
                description: result.message
            })
        }
    }

    return (
        <section>
            <h1 className="flex gap-2 items-center">
                <DoorOpen /> 
                <span className="text-2xl">Sign In</span>
            </h1>

            <p className="mb-4">Welcome back!</p>

            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(signIn)}>

                    <FormsInput control={form.control} path="email"
                        label="Login ID" placeHolder="Enter email for login" type="email" className="mb-3" />

                    <FormsInput control={form.control} path="password"
                        label="Password" type="password" className="mb-3" />

                    <div>
                        <Button type="submit">
                            <Unlock /> Sign In
                        </Button>
                    </div>
                </form>
            </FormProvider>
        </section>
    )
}