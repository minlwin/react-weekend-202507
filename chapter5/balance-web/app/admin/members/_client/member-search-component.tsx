'use client'

import PagerWidget from "@/components/widgets/pager-widget"
import MemberSearchResult from "./member-search-result"
import { useForm } from "react-hook-form"
import { MemberListItem, MemberSearch } from "@/lib/schema/admin.member.schema"
import { useEffect, useRef, useState } from "react"
import { DEFAULT_PAGE_RESULT, PageResult } from "@/lib/schema"

import * as memberClient from "@/lib/actions/admin.member.action"
import { safeCall } from "@/lib/utils"
import FormsSelect from "@/components/fields/forms-select"
import FormsInput from "@/components/fields/forms-input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export default function MemberSearchComponent() {

    const formRef = useRef<HTMLFormElement>(null)

    const form = useForm<MemberSearch>({defaultValues : {
        page: 0,
        size: 10
    }})
    
    const [result, setResult] = useState<PageResult<MemberListItem> | undefined>()
    const {contents, ...pageInfo} = result ? result : DEFAULT_PAGE_RESULT

    const disabled = form.watch("disabled")
    const from = form.watch("from")
    const to = form.watch("to")
    const keyword = form.watch("keyword")

    useEffect(() => {
        form.setValue("page", 0)
    }, [form, disabled, from, to, keyword])
    
    async function search(form:MemberSearch) {
        console.log(form)
        await safeCall(async () => {
            const response = await memberClient.search(form)
            setResult(response)
        })
    }

    async function onPageChange(page: number) {
        form.setValue("page", page)
        formRef.current?.submit()
    }

    async function onSizeChange(size: number) {
        form.setValue("page", 0)
        form.setValue("size", size)
        formRef.current?.submit()
    }

    return (
        <div className="space-y-4">
            <form ref={formRef} onSubmit={form.handleSubmit(search)}
                className="flex items-end gap-4">
                <FormsSelect label="Status" control={form.control} name="disabled" options={[
                    {key: "", value: "All Status"},
                    {key: "false", value: "Active"},
                    {key: "true", value: "Disabled"}
                ]} className="w-fit" />
                <FormsInput className="w-fit" label="Date From" control={form.control} name="from" type="date" />
                <FormsInput className="w-fit" label="Date To" control={form.control} name="to" type="date" />
                <FormsInput className="w-fit" label="Keyword" control={form.control} name="keyword" />
                <div>
                    <Button type="submit">
                        <Search /> Search
                    </Button>
                </div>
            </form>

            <MemberSearchResult list={contents} />
            <PagerWidget info={pageInfo} onPageChange={onPageChange} onSizeChange={onSizeChange} />
        </div>
    )
}