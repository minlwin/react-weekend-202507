'use client'

import { DEFAULT_PAGE_RESULT, Pager, PageResult } from "@/lib/schema"
import { LedgerListItem, LedgerSearch } from "@/lib/schema/member.ledger.schema"
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as ledgerClient from "@/lib/actions/member.ledger.action"
import LedgerSearchResult from "./ledger-search-result"
import PagerWidget from "@/components/widgets/pager-widget"

export default function LedgerSearchComponent() {

    const form = useForm<LedgerSearch>()
    const [result, setResult] = useState<PageResult<LedgerListItem>>()
    const {contents, ...pager} = result || DEFAULT_PAGE_RESULT

    async function onSubmit(form : LedgerSearch) {
        const response = await ledgerClient.search(form)
        setResult(response)
    }

    async function onPageChange(page : number) {

    }

    async function onSizeChange(size : number) {

    }

    return (
        <section>
            <form onSubmit={form.handleSubmit(onSubmit)}>

            </form>

            <LedgerSearchResult list={contents} />

            <PagerWidget info={pager}
                onPageChange={onPageChange} onSizeChange={onSizeChange} />
        </section>
    )
}