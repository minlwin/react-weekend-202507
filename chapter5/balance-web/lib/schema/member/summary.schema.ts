import { ChartData } from "../admin/summary.schema"

export type SummaryData = {
    debit : ChartData[]
    credit : ChartData[]
    series : BalanceData[]
    debitTotal : number
    creditTotal : number
}

export type BalanceData = {
    label: string
    debit : number
    credit : number
}