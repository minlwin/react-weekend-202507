'use client'

import { MemberDetails } from "@/lib/schema/admin.member.schema"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import * as memberClient from "@/lib/actions/admin.member.action"
import Loading from "@/components/widgets/loading"

export default function MemberDetailsComponent() {
    const { id } = useParams()
    const [details, setDetails] = useState<MemberDetails>()

    useEffect(() => {
        async function load() {
            if(id) {
                const result = await memberClient.findById(id)
                setDetails(result)
            }
        }

        load()
    }, [id, setDetails])

    async function updateStatus() {
        
    }

    if(!details) {
        return (
            <Loading />
        )
    }

    return (
        <>
        </>
    )
}

