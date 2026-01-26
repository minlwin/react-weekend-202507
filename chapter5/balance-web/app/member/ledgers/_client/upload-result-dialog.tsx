'use client'

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import InformationCard from "@/components/widgets/information-card";
import { LedgerUploadResult } from "@/lib/schema/member/ledger.schema";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Upload, X } from "lucide-react";

export default function UploadResultDialog({result, onClose} : {result ?: LedgerUploadResult, onClose : VoidFunction}) {

    return (
        <Dialog open={result != undefined}>
            <DialogContent showCloseButton={false} >
                <DialogHeader className="flex flex-row items-center gap-2">
                    <Upload />
                    <DialogTitle className="text-2xl">Upload Result</DialogTitle>
                </DialogHeader>
                <DialogDescription>Total 300 Record is uploaded.</DialogDescription>
                <div className="flex gap-4">
                    <InformationCard label="Created" value={result?.created || 0} />
                    <InformationCard label="Skipped" value={result?.skipped || 0} />
                    <InformationCard label="Error" value={result?.error || 0} />
                </div>
                <DialogFooter>
                    <Button type="button" onClick={onClose}>
                        <X /> Close
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}