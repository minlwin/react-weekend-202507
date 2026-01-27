'use client'

import Loading from "@/components/widgets/loading"
import { BalanceDetails } from "@/lib/schema/member/balance.schema"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import * as client from "@/lib/actions/member/balance.action"
import { safeCall } from "@/lib/utils"

export default function BalanceDetailsComponent() {

    const { id } = useParams()
    const [details, setDetails] = useState<BalanceDetails>()

    useEffect(() => {
        async function load() {
            if(id) {
                await safeCall(async () => {
                    const response = await client.findById(id)
                    setDetails(response)
                })               
            }
        }

        load()
    }, [setDetails, id])

    if(!details) {
        return (
            <Loading />
        )
    }

    return (
        <div></div>
    )
}