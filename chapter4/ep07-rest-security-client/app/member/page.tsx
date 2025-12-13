'use client'

import { Button } from "@/components/ui/button"
import SignOutButton from "@/components/widgets/signout-button"
import { getAdminMessages } from "@/lib/model/admin-actions"
import { getMemberMessage } from "@/lib/model/member-actions"
import { safeCall } from "@/lib/utils"
import { useState } from "react"

export default function MemberHome() {

    const [messages, setMessages] = useState<string[]>([])


    async function loadMessage() {
        await safeCall(async () => {
            const result = await getMemberMessage()
            setMessages(result)
        })
    }

    return (
        <>
            <nav className="bg-teal-800 text-white py-4 px-16 flex justify-between items-center">
                <h1 className="font-semibold text-xl">Member Home</h1>

                <div>
                    <SignOutButton />
                </div>
            </nav>

            <main className="py-4 px-16 space-y-4">
                <h1>Member Page</h1>

                <ul>
                {messages.map((a, index) => 
                    <li key={index}>{a}</li>
                )}    
                </ul>

                <Button type="button" onClick={loadMessage}>
                    Load Message
                </Button>
            </main>
        </>
    )
}