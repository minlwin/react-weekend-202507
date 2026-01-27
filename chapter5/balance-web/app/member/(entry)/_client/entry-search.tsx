'use client'

import { EntryListItem, EntrySearch } from "@/lib/schema/member/entry.schema"
import { LedgerType } from "@/lib/schema/member/ledger.schema"
import { getLastMonthFirstDay, safeCall } from "@/lib/utils"
import { useForm } from "react-hook-form"
import * as client from '@/lib/actions/member/entry.action'
import { useEffect, useState } from "react"
import { DEFAULT_PAGE_RESULT, PageResult } from "@/lib/schema"
import FormsInput from "@/components/fields/forms-input"
import { Button } from "@/components/ui/button"
import { Search, Download, ArrowRight, Plus } from "lucide-react"
import NoData from "@/components/widgets/no-data"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import PagerWidget from "@/components/widgets/pager-widget"
import Link from "next/link"

export default function EntrySearchComponent({type} : {type : LedgerType}) {

    const form = useForm<EntrySearch>({defaultValues : {
        from: getLastMonthFirstDay(),
        page : 0,
        size : 10
    }})

    const from = form.watch("from")
    const to = form.watch("to")
    const keyword = form.watch("keyword")

    useEffect(() => {
        form.setValue("page", 0)
    }, [form, from, to, keyword])

    useEffect(() => {
        form.handleSubmit(onSearch)()
    }, [form.handleSubmit])

    const [result, setResult] = useState<PageResult<EntryListItem>>()
    const {contents, ...pager} = result || DEFAULT_PAGE_RESULT

    async function onSearch(form : EntrySearch) {
        console.log(form)
        await safeCall(async () => {
            const response = await client.search(type, form)
            setResult(response)
        })
    }

    async function onExport(form: EntrySearch) {
        await safeCall(async () => {
            await client.downloadExcel(type, form)
        })
    }

    function downloadExcel() {
        form.handleSubmit(onExport)()
    }

    function onPageChange(page : number) {
        form.setValue("page", page)
        form.handleSubmit(onSearch)()
    }

    function onSizeChange(size : number) {
        form.setValue("page", 0)
        form.setValue("size", size)
        form.handleSubmit(onSearch)()
    }

    return (
        <div className="space-y-4">
            <form onSubmit={form.handleSubmit(onSearch)} className="flex gap-4 items-end">
                <FormsInput control={form.control} name="from" label="Date From" type="date" className="w-fit" />
                <FormsInput control={form.control} name="to" label="Date To" type="date" className="w-fit" />
                <FormsInput control={form.control} name="keyword" label="Keyword" className="w-fit" />

                <div className="space-x-2">
                    <Button type="submit">
                        <Search/> Search
                    </Button>

                    <Button type="button" variant={"destructive"} asChild>
                        <Link href={`/member/${type.toLocaleLowerCase()}/edit`}>
                            <Plus /> New Entry   
                        </Link>                     
                    </Button>

                    <Button type="button" variant={"outline"} onClick={downloadExcel}>
                        <Download /> Export Excel                        
                    </Button>
                </div>
            </form>

            <EntrySearchResult list={contents} />

            <PagerWidget info={pager} onPageChange={onPageChange} onSizeChange={onSizeChange} />
        </div>
    )
}

function EntrySearchResult({list} : {list : EntryListItem[]}) {
    if(list.length == 0) {
        return (
            <NoData name="Ledger Entry" />
        )
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Trx ID</TableHead>
                    <TableHead>Ledger</TableHead>
                    <TableHead>Particular</TableHead>
                    <TableHead className="text-end">Amount</TableHead>
                    <TableHead></TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
            {list.map((item, index) => 
                <TableRow key={index}>
                    <TableCell>{item.id.code}</TableCell>
                    <TableCell>{`${item.ledgerCode} - ${item.ledgerName}`}</TableCell>
                    <TableCell>{item.particular}</TableCell>
                    <TableCell className="text-end">{item.amount}</TableCell>
                    <TableCell className="flex justify-center">
                        <Link href={`/member/balances/${item.id.code}`}>
                            <ArrowRight className="size-4" />
                        </Link>
                    </TableCell>
                </TableRow>
            )}
            </TableBody>
        </Table>
    )
}