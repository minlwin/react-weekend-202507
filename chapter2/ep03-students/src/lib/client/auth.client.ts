"use server-only"

import { SignInForm, SignInResponse } from "../model/auth.model";

export async function signInRequest(form: SignInForm) {
    
    if(!["student", "teacher", "staff"].includes(form.password.toLocaleLowerCase())) {
        throw new Error("Please check your login information")
    }

    return {
        name: "User Name",
        role: form.password.toUpperCase()
    } as SignInResponse
}