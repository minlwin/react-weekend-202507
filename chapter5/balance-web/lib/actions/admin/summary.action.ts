'use server'

import { secureRequest, secureSearch } from "@/lib"
import { ChartData, MonthData } from "@/lib/schema/admin/summary.schema"

export async function getYears():Promise<string[]> {
    const response = await secureRequest('admin/summary/years')
    return await response.json()
}

export async function getMonths():Promise<MonthData[]> {
    const response = await secureRequest("admin/summary/months")
    return await response.json()
}

export async function getChartData(year: string, month? : string):Promise<ChartData[]> {
    const response = await (month ? secureSearch(`admin/summary/members/${year}`, {month : month}) : secureSearch(`admin/summary/members/${year}`))
    return await response.json()
}