'use client'

import { MemberDetails } from "@/lib/schema/admin/member.schema"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import * as memberClient from "@/lib/actions/admin/member.action"
import Loading from "@/components/widgets/loading"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Information from "@/components/widgets/information"
import InformationCard from "@/components/widgets/information-card"
import { Button } from "@/components/ui/button"
import { Check, X } from "lucide-react"
import ConfirmDialog from "@/components/widgets/confirm-dialog"

export default function MemberDetailsComponent() {
    const { id } = useParams()
    const [updated, setUpdated] = useState<Date>()
    const [user, setUser] = useState<MemberDetails>()
    const [initials, setInitials] = useState<string>()

    useEffect(() => {
        async function load() {
            if(id) {
                const result = await memberClient.findById(id)
                setUser(result)

                let calculatedInitial = result.name.split(" ")
                    .map(a => a[0])
                    .map(a => a.toUpperCase())
                    .join("")

                if(calculatedInitial.length > 2) {
                    calculatedInitial = calculatedInitial.substring(0, 2)
                }

                setInitials(calculatedInitial)
            }
        }

        load()
    }, [id, setUser, updated])

    async function updateStatus() {
        if(user) {
            const result = await memberClient.updateStatus(user.id, {
                disabled: `${!user.disabled}`
            })

            if(result) {
                setUpdated(new Date)
            }
        }
    }

    if(!user) {
        return (
            <Loading />
        )
    }

    return (
        <Card className="mt-6 w-full lg:w-2/3">
            <CardHeader>
                <div className="flex justify-between">
                    <div className="flex gap-2">
                        <Avatar>
                            <AvatarFallback className="bg-black text-white">{initials}</AvatarFallback>
                        </Avatar>

                        <div>
                            <CardTitle>{user.name}</CardTitle>
                            <CardDescription>{`User ID # ${user.id}`}</CardDescription>
                        </div>
                    </div>

                    <CardAction>
                        <Badge variant={user.disabled ? "destructive" : "outline"}>{user.disabled ? "Disabled" : "Active"}</Badge>
                    </CardAction>
                </div>
            </CardHeader>

            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <Information label="Email Address" value={user.email} />
                        <Information label="Registration Date" value={user.registeredAt || "Unknown"} />
                    </div>

                    <div className="flex gap-4 flex-col md:flex-row">
                        <InformationCard value={user.ledgers} label="Ledgers" />
                        <InformationCard value={user.entries} label="Entries" />
                    </div>
                </div>
            </CardContent>

            <CardFooter className="justify-end">
                <ConfirmDialog action={updateStatus} message={`Do you want to ${user.disabled ? 'Activate' : 'Deactivate'}?`}>
                    <Button variant={user.disabled ? "default" : "destructive"} >
                        {user.disabled ? <Check /> : <X />} 
                        <span>{user.disabled ? "Activate" : "Deactivate"}</span>
                    </Button>
                </ConfirmDialog>
            </CardFooter>
        </Card>
    )
}

