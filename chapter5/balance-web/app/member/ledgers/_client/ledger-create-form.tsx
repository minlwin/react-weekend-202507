'use client'

import PageTitle from "@/components/widgets/page-title"
import { LedgerCreateFrom, LedgerCreateSchema } from "@/lib/schema/member.ledger.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as ledgerClient from "@/lib/actions/member.ledger.action"
import { useRouter } from "next/navigation"
import FormsSelect from "@/components/fields/forms-select"
import FormsInput from "@/components/fields/forms-input"
import FormsTextarea from "@/components/fields/forms-textarea"
import { Button } from "@/components/ui/button"
import { Save } from "lucide-react"
import { safeCall } from "@/lib/utils"

export default function LedgerCreateComponent() {
    const router = useRouter()
    const form = useForm({
        resolver: zodResolver(LedgerCreateSchema),
        defaultValues: {
            type: "",
            code: "",
            name: "",
            description: ""
        }
    })

    async function onSubmit(form: LedgerCreateFrom) {
        safeCall(async () => {
            const result = await ledgerClient.create(form)
            router.push(`/member/ledgers/${result.id}`)
        })
    }

    return (
        <section className="space-y-6">
            <PageTitle title="Create New Ledger" icon="Plus" />

            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full md:w-1/2 space-y-4">

                <div className="flex gap-4">
                    <FormsSelect control={form.control} name="type" options={[
                        {key: "", value : "Select One"},
                        {key: "Debit", value: "Debit"},
                        {key: "Credit", value: "Credit"}
                    ]} className="w-1/2" label="Ledger Type"/>

                    <FormsInput control={form.control} name="code" label="Ledger Code" />
                </div>
                
                <FormsInput control={form.control} name="name" label="Ledger Name" />

                <FormsTextarea control={form.control} name="description" label="Description" />

                <Button type="submit">
                    <Save /> Save
                </Button>
            </form>
        </section>
    )
}