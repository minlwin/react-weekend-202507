'use server'

import { cookies } from "next/headers"
import { setAuthResult } from "../login-user-info"
import { publicRequest } from "../rest-client"
import { AuthResult, SignInForm, SignUpForm } from "../types/auth"
import { POST_CONFIG } from "../utils"

export async function signInAction(form: SignInForm): Promise<"Admin" | "Member"> {

    const response = await publicRequest("auth/signin", {
        ...POST_CONFIG,
        body: JSON.stringify(form)
    })

    const authResult = await response.json() as AuthResult
    await setAuthResult(authResult)

    return authResult.role
}

export async function signUpAction(form : SignUpForm): Promise<"Admin" | "Member"> {
    const response = await publicRequest("auth/signup", {
        ...POST_CONFIG,
        body: JSON.stringify(form)
    })

    const authResult = await response.json() as AuthResult
    await setAuthResult(authResult)

    return authResult.role
}

export async function signOutAction() {
    const cookieStore = await cookies()
    cookieStore.delete("loginUser")
    cookieStore.delete("refreshToken")
    cookieStore.delete("accessToken")
}