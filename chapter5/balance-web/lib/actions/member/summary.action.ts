"use server"

import { secureRequest, secureSearch } from "@/lib"
import { MonthData } from "@/lib/schema/admin/summary.schema"
import { SummaryData } from "@/lib/schema/member/summary.schema"

export async function getYears():Promise<string[]> {
    const response = await secureRequest('member/dashboard/years')
    return await response.json()
}

export async function getMonths():Promise<MonthData[]> {
    const response = await secureRequest("member/dashboard/months")
    return await response.json()
}

export async function getChartData(year: string, month? : string):Promise<SummaryData> {
    const response = await (month ? secureSearch(`member/dashboard/summary/${year}`, {month : month}) : secureSearch(`member/dashboard/summary/${year}`))
    return await response.json()
}