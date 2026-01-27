'use client'

import PageTitle from "@/components/widgets/page-title"
import { EntryForm, EntrySchema } from "@/lib/schema/member/entry.schema"
import { LedgerListItem, LedgerType } from "@/lib/schema/member/ledger.schema"
import { safeCall } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import * as ledgerClient from "@/lib/actions/member/ledger.action"
import * as entryClient from "@/lib/actions/member/entry.action"
import * as balanceClient from "@/lib/actions/member/balance.action"
import FormsSelect, { Option } from "@/components/fields/forms-select"
import { Plus, Save, Trash } from "lucide-react"
import FormsInput from "@/components/fields/forms-input"
import FormsTextarea from "@/components/fields/forms-textarea"
import { Button } from "@/components/ui/button"
import FormsReadonly from "@/components/fields/forms-readonly"


export default function EntryEditComponent({type} : {type : LedgerType}) {

    const query = useSearchParams()
    const id = query.get("id")
    const router = useRouter()

    const DEFAULT_ITEM = {item : "", quantity: "1", unitPrice: "0", remark: ""}

    const form = useForm({
        resolver : zodResolver(EntrySchema),
        defaultValues: {
            code : "",
            issueAt : "",
            particular: "",
            items: [
                {...DEFAULT_ITEM}
            ]
        }
    })

    useEffect(() => {
        // Load Data for Edit
        async function load() {
            if(id) {
                await safeCall(async () => {
                    const details = await balanceClient.findById(id)
                    form.setValue("code", details.code)
                    form.setValue("issueAt", details.issueDate)
                    form.setValue("particular", details.particular)
                    form.setValue("items", details.items.map(a => ({
                        item: a.item,
                        unitPrice: a.unitPrice.toString(),
                        quantity: a.quantity.toString(),
                        remark : a.remark
                    })))
                })
            }
        }

        load()
    }, [form, id])

    async function onSave(form : EntryForm) {
        await safeCall(async () => {
            const response = await (id ? entryClient.update(id, form) : entryClient.create(form))
            router.push(`/member/balances/${response.id.code}`)
        })
    }

    const [ledgers, setLedgers] = useState<LedgerListItem[]>([])
    const ledgerOptions: Option[] = [
        {key : "", value : "Select One"},
        ...ledgers.map(a => ({
            key: a.code,
            value : a.name
        }))
    ]
    
    useEffect(() => {
        // Load Ledger Data
        async function load() {
            await safeCall(async () => {
                const {contents} = await ledgerClient.search({type: type, size : 100})
                setLedgers(contents)              
            })
        }

        load()
    }, [setLedgers])

    const fieldArray = useFieldArray({
        control: form.control,
        name : 'items'
    })

    function addItem() {
        fieldArray.append({...DEFAULT_ITEM})
    }

    function removeItem(index : number) {
        const length = fieldArray.fields.length
        fieldArray.remove(index)
        if(length <= 1) {
            addItem()
        } 
    }

    const items = form.watch("items")

    function getTotal(index : number) {
        const item = items[index]
        if(item && !Number.isNaN(item.unitPrice) && !Number.isNaN(item.quantity)) {
            return Number.parseInt(item.unitPrice) * Number.parseInt(item.quantity) || 0
        }
        return 0
    }

    function getAllTotal() {
        return items.map(a => {
            if(!Number.isNaN(a.quantity) && !Number.isNaN(a.unitPrice)) {
                return Number.parseInt(a.unitPrice) * Number.parseInt(a.quantity) || 0
            }
            return 0;
        }).reduce((a, b) => a + b)
    }

    return (
        <section className="space-y-6">
            <PageTitle title={`${id ? "Edit" : "New"} ${type} Entry`} icon={id ? "Pencil" : "Plus"} />

            <form onSubmit={form.handleSubmit(onSave)} className="space-y-6">
                {/* Form Header */}
                <section className="w-full md:w-2/3 space-y-4">
                    <div className="flex gap-4">
                        <FormsSelect control={form.control} name="code" label="Ledger" options={ledgerOptions} />
                        <FormsInput control={form.control} name="issueAt" type="date" label="Issue Date" className="w-80" />
                        <FormsReadonly label="Total Amount" className="w-80" value={getAllTotal()} />
                    </div>

                    <FormsTextarea control={form.control} name="particular" label="Particular" />
                </section>

                {/* Form Items */}
                <section className="space-y-4">
                    <h3 className="text-xl">Entry Items</h3>
                    <div className="space-y-2">
                        {fieldArray.fields.map((item, index) => 
                            <div key={item.id} className="flex items-start gap-4">
                                <FormsInput control={form.control} name={`items.${index}.item`} label={index == 0 ? "Item" : undefined} className="w-240"/>
                                <FormsInput control={form.control} name={`items.${index}.remark`} label={index == 0 ? "Remark" : undefined} />
                                <FormsInput control={form.control} name={`items.${index}.unitPrice`} label={index == 0 ? "Unit Price" : undefined} type="number" className="w-180" />
                                <FormsInput control={form.control} name={`items.${index}.quantity`} label={index == 0 ? "Quantity" : undefined} type="number" className="w-120"/>
                                <FormsReadonly label={index == 0 ? "Total" : undefined} value={getTotal(index)} className="w-180" />
                                <Button type="button" onClick={() => removeItem(index)} className={index == 0 ? "mt-8" : ""}>
                                    <Trash />
                                </Button>
                            </div>
                        )}
                    </div>
                    <div className="space-x-2">
                        <Button type="button" variant={'secondary'} onClick={addItem}>
                            <Plus /> Add Item
                        </Button>
                        <Button type="submit">
                            <Save /> Save Entry
                        </Button>
                    </div>
                </section>
            </form>
        </section>
    )
}