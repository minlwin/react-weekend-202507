'use client'

import { signOutAction } from "@/lib/actions/anonymous/auth.action"
import { useEffect } from "react"

export default function SignOutWidget() {

    useEffect(() => {
        signOutAction()
    }, [])

    return (
        <></>
    )
}