import 'server-only'

import { cookies } from "next/headers";
import { AuthResult, LoginUser } from "./schema/anonymous/auth.schema";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { redirect } from "next/navigation";

export async function setAuthResult(auth : AuthResult) {

    const {accessToken, refreshToken, ... loginUser} = auth
    const cookieStore = await cookies()
    const secure = process.env.NODE_ENV === 'production'

    const options:Partial<ResponseCookie> = {
        httpOnly: true,
        secure: secure,
        sameSite: 'lax',
        path: "/",
        maxAge: 60 * 60
    } 

    cookieStore.set("loginUser", JSON.stringify(loginUser), options);
    cookieStore.set("accessToken", accessToken, options)
    cookieStore.set("refreshToken", refreshToken, options)
}

export async function clearAuthResult() {
    const cookiesStore = await cookies()
    cookiesStore.delete("loginUser")
    cookiesStore.delete("accessToken")
    cookiesStore.delete("refreshToken")
}

export async function isLogIn() {
    const cookiesStore = await cookies()
    return  cookiesStore.get("loginUser")?.value != undefined
}

export async function getLoginUser() {
    const cookiesStore = await cookies()
    const userInfo = cookiesStore.get("loginUser")?.value

    if(!userInfo) {
        redirect("/signin")
    }

    return JSON.parse(userInfo) as LoginUser
}

export async function getAccessToken() {
    const cookiesStore = await cookies()
    return cookiesStore.get("accessToken")?.value
}

export async function getRefreshToken() {
    const cookiesStore = await cookies()
    return cookiesStore.get("refreshToken")?.value
}