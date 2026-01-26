'use client'

import { signOutAction } from "@/lib/actions/anonymous/auth.action"
import IconWidget from "./icon-widget"

export default function SignOutMenu() {
    return (
        <span className="flex items-center gap-2 cursor-pointer" onClick={signOutAction}>
            <IconWidget icon="Lock" className="size-5" /> Sign Out
        </span>
    )
}