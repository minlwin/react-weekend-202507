import { PageSearch } from "."

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
    type? : LedgerType
    keyword? : string 
} & PageSearch