import z from "zod"
import { PageSearch } from ".."

export type LedgerType = "Debit" | "Credit"

export type LedgerListItem = {
    code: string
    type: LedgerType
    name: string
    description : string
    deleted: boolean
    createdAt: string
    modifiedAt: string
}

export type LedgerSearch = {
    type? : string
    deleted?: string
    keyword? : string 
} & PageSearch

export type LedgerDetails = {
    totalCount: number
    totalAmount: number
} & LedgerListItem

export const LedgerCreateSchema = z.object({
    type : z.string().nonempty("Please select ledger type."),
    code : z.string().nonempty("Please enter ledger code."),
    name: z.string().nonempty("Please enter ledger name."),
    description : z.string().nonempty("Please enter description.")
})

export type LedgerCreateFrom = z.infer<typeof LedgerCreateSchema>

export const LedgerEditSchema = z.object({
    name: z.string().nonempty("Please enter ledger name."),
    description : z.string().nonempty("Please enter description.")
})

export type LedgerEditForm = z.infer<typeof LedgerEditSchema>

export type LedgerUploadResult = {
    created : number
    skipped : number
    error : number
}