import { PageSearch } from ".."
import { LedgerEntryPk } from "./entry.schema"

export type BalanceSearch = {
    from? : string
    to? : string
} & PageSearch

export type BalanceListItem = {
    idCode : string
    ledger : string
    particular : string
    debit : number
    credit : number
    balance : number
}

export type BalanceDetails = {
    id: LedgerEntryPk,
    code : string
    ledgerType : string
    ledgerName : string
    issueDate : string
    particular : string
    lastBalance : number
    items : BalanceDetailsItem[]
    count : number
    amount : number
    editable: boolean
}

export type BalanceDetailsItem = {
    item : string
    unitPrice : number
    quantity : number
    total : number
    remark : string
}
