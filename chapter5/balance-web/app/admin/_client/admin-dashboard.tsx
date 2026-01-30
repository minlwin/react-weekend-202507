'use client'

import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import { ChartData, MonthData } from "@/lib/schema/admin/summary.schema"
import { ChangeEvent, useEffect, useState } from "react"
import * as client from "@/lib/actions/admin/summary.action"
import { safeCall } from "@/lib/utils"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { Area, AreaChart, XAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AreaChartIcon } from "lucide-react"

type ChartType = "Yearly" | "Monthly"

export default function AdminDashboardComponent() {

    const [years, setYears] = useState<string[]>([])
    const [type, setType] = useState<ChartType>("Monthly")

    const [months, setMonths] = useState<MonthData[]>([])
    const [year, setYear] = useState<string>()
    const [month, setMonth] = useState<string>()

    const [data, setData] = useState<ChartData[]>([])

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
            setData([])
            if(year) {
                await safeCall(async () => {
                    const response = await client.getChartData(year, month)
                    setData(response)
                })        
            }
        }
        loadData()
    }, [year, month, setData])

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
            
            <Card>
                <CardHeader>
                    <CardTitle className="flex gap-2 items-center"><AreaChartIcon /> Member Registrations</CardTitle>
                </CardHeader>

                <CardContent>
                    <ChartContainer className="w-full h-116" config={{}}>
                        <AreaChart accessibilityLayer data={data}>
                            <XAxis dataKey="label" tickMargin={8} />
                            <ChartTooltip />
                            <Area dataKey="value" type={"basis"} />
                        </AreaChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
    )
}