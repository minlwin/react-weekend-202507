'use client'

import PageTitle from "@/components/widgets/page-title"
import { LedgerDetails, LedgerEditForm, LedgerEditSchema } from "@/lib/schema/member.ledger.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import * as client from "@/lib/actions/member.ledger.action"
import Loading from "@/components/widgets/loading"
import { safeCall } from "@/lib/utils"
import FormsInput from "@/components/fields/forms-input"
import FormsTextarea from "@/components/fields/forms-textarea"
import { Button } from "@/components/ui/button"
import { Save } from "lucide-react"
import FormsReadonly from "@/components/fields/forms-readonly"

export default function LedgerEditComponent({code} : {code : string}) {

    const router = useRouter()
    const [ledger, setLedger] = useState<LedgerDetails>()

    const form = useForm({
        resolver: zodResolver(LedgerEditSchema),
        defaultValues: {
            name: "",
            description: ""
        }
    })

    useEffect(() => {
        async function load() {
            const response = await client.findById(code)
            setLedger(response)

            form.setValue("name", response.name)
            form.setValue("description", response.description)
        }
        load()
    }, [code, form])

    async function onSubmit(form : LedgerEditForm) {
        safeCall(async () => {
            const result = await client.update(code, form)
            router.push(`/member/ledgers/${code}`)
        })
    }

    if(!ledger) {
        return (
            <Loading />
        )
    }

    return (
        <section className="space-y-6">
            <PageTitle title="Edit Ledger" icon="Pencil" />

            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full md:w-1/2 space-y-4">
                
                <div className="flex gap-4">
                    <FormsReadonly label="Ledger Type" value={ledger.type} />
                    <FormsReadonly label="Code" value={ledger.code} />
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