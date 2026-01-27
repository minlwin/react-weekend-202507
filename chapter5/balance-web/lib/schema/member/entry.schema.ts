import z from "zod";
import { PageSearch } from "..";

export const EntrySchema = z.object({
    code : z.string().nonempty("Please enter ledger code."),
    issueAt : z.string().nonempty("Please enter issue at."),
    particular : z.string().nonempty("Please enter particular information."),
    items : z.array(z.object({
        item : z.string().nonempty("Please enter item name."),
        unitPrice : z.string().nonempty("Please enter unit price."),
        quantity : z.string().nonempty("Please enter quantity."),
        remark : z.string()
    }).nonoptional("Please enter details items."))
})

export type EntryForm = z.infer<typeof EntrySchema>

export type EntrySearch = {
    from? : string
    to?: string
    keyword? : string
} & PageSearch

export type LedgerEntryPk = {
    accountId: number
    issueAt: string
    entrySeq: number
    code: string
}

export type EntryListItem = {
    id : LedgerEntryPk
    ledgerType : string
    ledgerCode : string
    ledgerName : string
    particular : string
    amount : number
}