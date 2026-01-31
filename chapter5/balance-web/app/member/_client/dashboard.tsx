"use client"

import { ChartType } from "@/lib/schema"
import { MonthData } from "@/lib/schema/admin/summary.schema"
import { safeCall } from "@/lib/utils"
import { ChangeEvent, useEffect, useState } from "react"
import * as client from "@/lib/actions/member/summary.action"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import EntryProgress from "../_charts/entry-progress"
import SummaryChart from "../_charts/summary-chart"
import { SummaryData } from "@/lib/schema/member/summary.schema"

export default function DashboardComponent() {
    const [years, setYears] = useState<string[]>([])
    const [type, setType] = useState<ChartType>("Monthly")

    const [months, setMonths] = useState<MonthData[]>([])
    const [year, setYear] = useState<string>()
    const [month, setMonth] = useState<string>()

    const [summary, setSummary] = useState<SummaryData>()

    useEffect(() => {
        async function initData() {
            await safeCall(async () => {
                const yearsResponse = await client.getYears()
                setYears(yearsResponse)
                if(yearsResponse.length > 0) {
                    const targetYear = yearsResponse[yearsResponse.length - 1];
                    setYear(targetYear)
                }                

                const monthResponse = await client.getMonths()
                setMonths(monthResponse)
                setMonth("1")
            })
        }

        initData()
    }, [setYears, setMonths, setYear, setMonth]) 

    useEffect(() => {
        if(type == "Yearly") {
            setMonth(undefined)
        } else if(months.length > 0) {
            setMonth(String(months[0].value ))
        }
    }, [type, setMonth])

    useEffect(() => {       
        async function loadData() {
            setSummary(undefined)
            if(year) {
                await safeCall(async () => {
                    const response = await client.getChartData(year, month)
                    setSummary(response)
                })        
            }
        }
        loadData()
    }, [year, month, setSummary])

    function changeType(event : ChangeEvent<HTMLSelectElement>) {
        var selected = event.target.value as ChartType
        setType(selected)
    }

    async function changeYear(event : ChangeEvent<HTMLSelectElement>) {
        const targetYear = event.target.value
        setYear(targetYear)

        if(targetYear !== "" && months.length > 0) {
            const targetMonth = months[months.length - 1]
            setMonth(String(targetMonth.value))
        }
    }
    
    return (
        <div className="space-y-4">
            <nav className="flex gap-2">
                <NativeSelect value={type} onChange={changeType}>
                    <NativeSelectOption value={"Yearly"}>{"Yearly"}</NativeSelectOption>
                    <NativeSelectOption value={"Monthly"}>{"Monthly"}</NativeSelectOption>
                </NativeSelect>

                <NativeSelect onChange={changeYear}>
                    {years.map(item => 
                        <NativeSelectOption key={item} value={item}>{item}</NativeSelectOption>
                    )}
                </NativeSelect>

                {type == "Monthly" &&
                    <NativeSelect onChange={e => setMonth(e.target.value)}>
                        {months?.map(item => 
                            <NativeSelectOption key={item.value} value={item.value}>{item.name}</NativeSelectOption>
                        )}
                    </NativeSelect>
                }
            </nav>
            
            <EntryProgress data={summary?.series || []} />

            <div className="grid grid-cols-3 gap-4 h-90">
                <SummaryChart title="Debit" data={summary?.debit || []} />
                <SummaryChart title="Credit" data={summary?.credit || []} />
                <SummaryChart title="Balance" data={[
                    {label : "Debit", value : summary?.debitTotal || 0},
                    {label : "Credit", value : summary?.creditTotal || 0}
                ]} />
            </div>
        </div>
    )
}