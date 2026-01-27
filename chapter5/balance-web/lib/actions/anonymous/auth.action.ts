"use server"

import { redirect } from "next/navigation";
import { POST_CONFIG, publicRequest } from "../..";
import { clearAuthResult, setAuthResult } from "../../login-user";
import { AuthResult, SignInForm, SignUpForm } from "../../schema/anonymous/auth.schema";

export async function signInAction(form:SignInForm) {

    const response = await publicRequest('auth/signin', {
        ...POST_CONFIG,
        body: JSON.stringify(form)
    })

    if(!response.ok) {
        redirect("/signin")
    }

    const result = await response.json() as AuthResult
    await setAuthResult(result)
    
    redirect(`/${result.role.toLocaleLowerCase()}`)
}

export async function signUpAction(form : SignUpForm) {
    const response = await publicRequest('auth/signup', {
        ...POST_CONFIG,
        body: JSON.stringify(form)
    })

    if(!response.ok) {
        redirect("/signup")
    }

    const result = await response.json() as AuthResult
    await setAuthResult(result)
    
    redirect(`/${result.role.toLocaleLowerCase()}`)
}

export async function signOutAction() {
    await clearAuthResult()
    redirect("/signin")
}