'use client'

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import React from "react"
import { Button } from "../ui/button"
import { Check, X } from "lucide-react"

export default function ConfirmDialog({message, action, children} : {message:string, action : VoidFunction,children : React.ReactNode}) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Confirm</DialogTitle>
                <DialogDescription>{message}</DialogDescription>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant={'outline'}>
                            <X /> Cancel
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button onClick={action}>
                            <Check /> OK
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}