import { NextRequest, NextResponse } from "next/server";
import { getLoginUser, isLogIn } from "./lib/login-user";

export async function proxy(request : NextRequest) {

    const {pathname, origin} = request.nextUrl

    if(!await isLogIn()) {
        return NextResponse.redirect(
            new URL("/signin?message=You need to login for this operation.", origin)
        )
    }

    const loginUser = await getLoginUser()

    if(pathname.startsWith("/admin") && loginUser.role !== "Admin") {
        return NextResponse.redirect(
            new URL("/member?message=You can't access to admin features.", origin)
        )
    }

    if(pathname.startsWith("/member") && loginUser.role !== "Member") {
        return NextResponse.redirect(
            new URL("/admin?message=You can't access to member features.", origin)
        )
    }

    return NextResponse.next()
}

export const config = {
    matcher : [
        '/admin/:path*',
        '/member/:path*'
    ]
}