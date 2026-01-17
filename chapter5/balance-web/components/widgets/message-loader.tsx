'use client'

import { useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { toast } from "sonner"

export default function MessageLoader() {

    const searchParams = useSearchParams()
    const message = searchParams.get("message")

    useEffect(() => {
        if(message) {
            toast("Message", {
                description: [message]
            })
        }
    }, [message])

    return (
        <></>
    )
}