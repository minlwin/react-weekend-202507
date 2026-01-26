'use client'

import { DEFAULT_PAGE_RESULT, PageResult } from "@/lib/schema"
import { LedgerListItem, LedgerSearch, LedgerUploadResult } from "@/lib/schema/member/ledger.schema"
import React, { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import * as ledgerClient from "@/lib/actions/member/ledger.action"
import LedgerSearchResult from "./ledger-search-result"
import PagerWidget from "@/components/widgets/pager-widget"
import FormsSelect from "@/components/fields/forms-select"
import FormsInput from "@/components/fields/forms-input"
import { Button } from "@/components/ui/button"
import { File, Plus, Search } from "lucide-react"
import Link from "next/link"
import { safeCall } from "@/lib/utils"
import UploadResultDialog from "./upload-result-dialog"

export default function LedgerSearchComponent() {

    const form = useForm<LedgerSearch>({defaultValues: {
        page: 0,
        size: 10
    }})
    const [result, setResult] = useState<PageResult<LedgerListItem>>()
    const {contents, ...pager} = result || DEFAULT_PAGE_RESULT

    const type = form.watch('type')
    const deleted = form.watch('deleted')
    const keyword = form.watch('keyword')

    useEffect(() => {
        form.setValue("page", 0)
    }, [form, type, deleted, keyword])

    useEffect(() => {
        form.handleSubmit(onSubmit)()
    }, [form.handleSubmit])

    async function onSubmit(form : LedgerSearch) {
        await safeCall(async () => {
            const response = await ledgerClient.search(form)
            setResult(response)
        })
    }

    async function onPageChange(page : number) {
        form.setValue("page", page)
        form.handleSubmit(onSubmit)()
    }

    async function onSizeChange(size : number) {
        form.setValue("page", 0)
        form.setValue("size", size)
        form.handleSubmit(onSubmit)()
    }

    const uploadInputRef = useRef<HTMLInputElement>(null)
    const uploadInput = uploadInputRef.current

    const [uploadResult, setUploadResult] = useState<LedgerUploadResult>()

    useEffect(() => {
        if(uploadInput) {
            uploadInput.onchange = e => {
                console.log(uploadInput.value)
            }
        }
    }, [uploadInput])

    function onClickUpload() {
        uploadInputRef.current?.click()
    }

    async function onFileChange(event : React.ChangeEvent<HTMLInputElement>) {
        
        await safeCall(async () => {
            const file = event.target.files?.[0]
            if(!file) {
                return
            }

            const formData = new FormData
            formData.append("file", file)

            const response = await ledgerClient.upload(formData)
            setUploadResult(response)
        })
    }

    return (
        <section className="space-y-4 mt-4">
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-4 items-end">
                <FormsSelect control={form.control} name="type" label="Type" options={[
                    {key : "", value : "Search All"},
                    {key : "Debit", value: "Debit"},
                    {key : "Credit", value : "Credit"}
                ]} className="w-fit" />
                <FormsSelect control={form.control} name="deleted" label="Status" options={[
                    {key : "", value : "Search All"},
                    {key : "false", value : "Active"},
                    {key : "true", value : "Deleted"},
                ]} className="w-fit" />
                <FormsInput control={form.control} name="keyword" label="Keyword" className="w-fit" />
                <div className="space-x-2">
                    <Button type="submit">
                        <Search/> Search
                    </Button>
                    <Button variant='destructive' asChild>
                        <Link href={'/member/ledgers/edit'}>
                            <Plus /> Add New
                        </Link>
                    </Button>
                    <Button type="button" variant={"outline"} onClick={onClickUpload}>
                        <File /> File Upload
                    </Button>
                </div>
            </form>

            <LedgerSearchResult list={contents} />

            <PagerWidget info={pager}
                onPageChange={onPageChange} onSizeChange={onSizeChange} />

            <form className="hidden">
                <input ref={uploadInputRef} onChange={onFileChange} type="file" />
            </form>
            
            <UploadResultDialog result={uploadResult} onClose={() => {
                setUploadResult(undefined)
                if(uploadInputRef.current) {
                    uploadInputRef.current.value = ''
                }
            }} />
        </section>
    )
}