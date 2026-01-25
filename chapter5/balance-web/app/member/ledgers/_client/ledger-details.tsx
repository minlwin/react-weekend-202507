'use client'

import { LedgerDetails } from "@/lib/schema/member.ledger.schema"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import * as client from "@/lib/actions/member.ledger.action"
import { safeCall } from "@/lib/utils"
import Loading from "@/components/widgets/loading"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Information from "@/components/widgets/information"
import InformationCard from "@/components/widgets/information-card"
import ConfirmDialog from "@/components/widgets/confirm-dialog"
import { Button } from "@/components/ui/button"
import { Check, Pencil, X } from "lucide-react"
import Link from "next/link"

export default function LedgerDetailsComponent() {
    const {id} = useParams()
    const [details, setDetails] = useState<LedgerDetails>()
    const [updated, setUpdated] = useState<Date>()

    useEffect(() => {
        async function load() {
            safeCall(async () => {
                if(id) {
                    const result = await client.findById(id as string)
                    setDetails(result)
                }
            })
        }

        load()
    }, [setDetails, id, updated])

    async function updateStatus() {
        if(details) {
            safeCall(async () => {
                const response = await client.updateStatus(details.code, !details.deleted)
                if(response) {
                    setUpdated(new Date)
                }
            })
        }
    }

    if(!details) {
        return (
            <Loading />
        )
    }

    return (
        <Card className="w-full lg:w-2/3">
            <CardHeader>
                <div className="flex justify-between">
                    <div className="flex gap-2">
                        <Avatar>
                            <AvatarFallback className="bg-black text-white">{details.type.toUpperCase().substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle>{`${details.code} ${details.name}`}</CardTitle>
                            <CardDescription>{details.description}</CardDescription>
                        </div>
                    </div>
                    <div>
                        <Badge variant={details.deleted ? "destructive" : "outline"}>{details.deleted ? "Deleted" : "Active"}</Badge>
                    </div>
                </div>
            </CardHeader>

            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <Information label="Created At" value={details.createdAt} />
                        <Information label="Modified At" value={details.modifiedAt} />
                    </div>
                    <div className="flex gap-4 flex-col md:flex-row">
                        <InformationCard label="Entries" value={details.totalCount} />
                        <InformationCard label="Amount" value={details.totalAmount} />
                    </div>
                </div>
            </CardContent>

            <CardFooter className="justify-end gap-2">
                <Button asChild>
                    <Link href={`/member/ledgers/edit?code=${id}`}>
                        <Pencil /> Edit
                    </Link>
                </Button>
                <ConfirmDialog action={updateStatus} message="Do you want to delete this ledger.">
                    <Button variant={'destructive'}>
                        {details.deleted ? 
                            <>
                                <Check /> Activate
                            </> : 
                            <>
                                <X /> Delete
                            </>}
                    </Button>
                </ConfirmDialog>
            </CardFooter>
        </Card>
    )
}