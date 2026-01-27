'use client'

import NoData from "@/components/widgets/no-data"
import { DEFAULT_PAGE_RESULT, PageResult } from "@/lib/schema"
import { BalanceListItem, BalanceSearch } from "@/lib/schema/member/balance.schema"
import { getLastMonthFirstDay, safeCall } from "@/lib/utils"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import * as client from '@/lib/actions/member/balance.action'
import PagerWidget from "@/components/widgets/pager-widget"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { ArrowRight, Download, Search } from "lucide-react"
import FormsInput from "@/components/fields/forms-input"
import { Button } from "@/components/ui/button"

export default function BalanceSearchComponent () {

    const form = useForm<BalanceSearch>({defaultValues : {
        from: getLastMonthFirstDay(),
        page : 0,
        size : 10
    }})

    const [result, setResult] = useState<PageResult<BalanceListItem>>()
    const {contents, ...pager} = result || DEFAULT_PAGE_RESULT

    const from = form.watch("from")
    const to = form.watch("to")

    useEffect(() => {
        form.setValue("page", 0)
    }, [form, from, to])

    useEffect(() => {
        form.handleSubmit(onSearch)()
    }, [form.handleSubmit])

    async function onSearch(form : BalanceSearch) {
        await safeCall(async () => {
            const response = await client.search(form)
            setResult(response)
        })
    }

    async function onDownload(form : BalanceSearch) {
        await safeCall(async () => {
            await client.downloadExcel(form)
        })
    }

    function downloadExcel() {
        form.handleSubmit(onDownload)()
    }

    async function onSizeChage(size : number) {
        form.setValue("page", 0)
        form.setValue("size", size)
        form.handleSubmit(onSearch)()
    }

    async function onPageChange(page : number) {
        form.setValue("page", page)
        form.handleSubmit(onSearch)()
    }

    return (
        <div className="space-y-4 mt-4">
            <form onSubmit={form.handleSubmit(onSearch)} className="flex gap-4 items-end">
                <FormsInput control={form.control} name="from" className="w-fit" type="date" label="Date From" />
                <FormsInput control={form.control} name="to" className="w-fit" type="date" label="Date To" />

                <div className="space-x-2">
                    <Button type="submit">
                        <Search/> Search
                    </Button>
                    <Button type="button" variant={"outline"} onClick={downloadExcel}>
                        <Download /> Export Excel                        
                    </Button>
                </div>
            </form>

            <BalanceSearchResult list={contents} />
            <PagerWidget info={pager} onPageChange={onPageChange} onSizeChange={onSizeChage} />
        </div>
    )
}

function BalanceSearchResult({list} : {list? : BalanceListItem[]}) {

    if(!list) {
        return (
            <NoData name="Balance" />
        )
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Trx ID</TableHead>
                    <TableHead>Ledger</TableHead>
                    <TableHead>Particular</TableHead>
                    <TableHead className="text-end">Debit</TableHead>
                    <TableHead className="text-end">Credit</TableHead>
                    <TableHead className="text-end">Balance</TableHead>
                    <TableHead></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {list.map((item, index) => 
                    <TableRow key={index}>
                        <TableCell>{item.idCode}</TableCell>
                        <TableCell>{item.ledger}</TableCell>
                        <TableCell>{item.particular}</TableCell>
                        <TableCell className="text-end">{item.debit.toLocaleString()} MMK</TableCell>
                        <TableCell className="text-end">{item.credit.toLocaleString()} MMK</TableCell>
                        <TableCell className="text-end">{item.balance.toLocaleString()} MMK</TableCell>
                        <TableCell className="flex justify-center">
                            <Link href={`/member/balances/${item.idCode}`}>
                                <ArrowRight className="size-4" />
                            </Link>
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}