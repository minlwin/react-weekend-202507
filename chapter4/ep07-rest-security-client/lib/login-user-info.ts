import { cookies } from "next/headers";
import { AuthResult, UserInfo } from "./types/auth";
import { redirect } from "next/navigation";

export async function setAuthResult(result : AuthResult) {
    const {accessToken, refreshToken, ...userInfo} = result
    const secure = process.env.NODE_ENV === "production"

    const cookieStore = await cookies()

    cookieStore.set('accessToken', accessToken, {
        httpOnly: true,
        secure: secure,
        sameSite: 'lax',
        path : '/',
        maxAge: 60 * 60
    })

    cookieStore.set('refreshToken', refreshToken, {
        httpOnly: true,
        secure: secure,
        sameSite: 'lax',
        path : '/',
        maxAge: 60 * 60
    })

    cookieStore.set('loginUser', JSON.stringify(userInfo), {
        httpOnly: true,
        secure: secure,
        sameSite: 'lax',
        path : '/',
        maxAge: 60 * 60
    })
}

export async function getLoginUser() {

    const cookieStore = await cookies()
    const userInfoValue = cookieStore.get("loginUser")?.value

    if(!userInfoValue) {
        redirect("/signin")
    }

    return JSON.parse(userInfoValue) as UserInfo
}

export async function getAccessToken() {
    const cookieStore = await cookies()
    return cookieStore.get("accessToken")?.value
}

export async function getRefreshToken() {
    const cookieStore = await cookies()
    return cookieStore.get("refreshToken")?.value
}
