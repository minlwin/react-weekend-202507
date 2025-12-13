'use client'

import { signOutAction } from "@/lib/model/auth-actions"
import { safeCall } from "@/lib/utils"
import { DoorClosed } from "lucide-react"
import { useRouter } from "next/navigation"
import { MouseEvent } from "react"

export default function SignOutButton() {

    const router = useRouter()

    async function signOut(e : MouseEvent<HTMLAnchorElement>) {
        e.preventDefault()
        await safeCall(async () => {
            await signOutAction()
            router.replace("/signin")
        })
    }

    return (
        <>
            <a href="#" onClick={signOut} className="flex gap-2 items-center">
                <DoorClosed className="size-4" />
                <span>Sign Out</span>
            </a>
        </>
    )
}