'use client'

import Loading from "@/components/widgets/loading"
import { BalanceDetails } from "@/lib/schema/member/balance.schema"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import * as client from "@/lib/actions/member/balance.action"
import { safeCall } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Pencil } from "lucide-react"

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
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>General Information</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-y-4">
                        <div>
                        <p className="text-xs text-muted-foreground">Ledger Name</p>
                        <p className="font-semibold">{details.ledgerName}</p>
                        </div>
                        <div>
                        <p className="text-xs text-muted-foreground">Issue Date</p>
                        <p className="font-semibold">{details.issueDate}</p>
                        </div>
                        <div className="col-span-2 border-t pt-4">
                        <p className="text-xs text-muted-foreground">Particular</p>
                        <p className="text-sm">{details.particular || "—"}</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Finantial Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Total Amount</span>
                        <span className="text-xl font-bold text-primary underline decoration-2 underline-offset-4">
                            {details.amount.toLocaleString()}
                        </span>
                        </div>
                        <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Item Count</span>
                        <span>{details.count} items</span>
                        </div>
                        <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Code</span>
                        <code className="bg-muted px-1 rounded">{details.code}</code>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Entry Items</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>No.</TableHead>
                                <TableHead>Item Name</TableHead>
                                <TableHead>Remark</TableHead>
                                <TableHead className="text-end">Unit Price</TableHead>
                                <TableHead className="text-end">Quantity</TableHead>
                                <TableHead className="text-end">Total</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                        {details.items.map((item, index) => 
                            <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{item.item}</TableCell>
                                <TableCell>{item.remark}</TableCell>
                                <TableCell className="text-end">{item.unitPrice.toLocaleString()} MMK</TableCell>
                                <TableCell className="text-end">{item.quantity.toLocaleString()}</TableCell>
                                <TableCell className="text-end">{item.total.toLocaleString()} MMK</TableCell>
                            </TableRow>
                        )}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell colSpan={5}>
                                    Total Amount
                                </TableCell>
                                <TableCell className="text-end">{details.amount.toLocaleString()} MMK</TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </CardContent>
            </Card>

            <div>
                {details.editable && 
                    <Button type="button" variant={'destructive'} asChild>
                        <Link href={`/member/${details.ledgerType.toLocaleLowerCase()}/edit?id=${details.id.code}`}>
                            <Pencil /> Edit Entry
                        </Link>
                    </Button>
                }
            </div>

        </div>
    )
}