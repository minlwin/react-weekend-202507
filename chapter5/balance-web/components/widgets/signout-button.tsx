'use client'

import { signOutAction } from "@/lib/actions/anonymous/auth.action"
import { Button } from "../ui/button"
import { Lock } from "lucide-react"

export default function SignOutButton() {
    return (
        <Button onClick={signOutAction}>
            <Lock /> Sign Out
        </Button>
    )
}