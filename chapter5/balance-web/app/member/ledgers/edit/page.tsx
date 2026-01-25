'use client'

import { useSearchParams } from "next/navigation"
import LedgerEditComponent from "../_client/ledger-edit-form"
import LedgerCreateComponent from "../_client/ledger-create-form"

export default function LedgerEditPage() {

    const searchParam = useSearchParams()
    const code = searchParam.get("code")

    if(code) {
        return (
            <LedgerEditComponent code={code} />
        )
    }

    return (
        <LedgerCreateComponent />
    )
}