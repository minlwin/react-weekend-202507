import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { BalanceData } from "@/lib/schema/member/summary.schema";
import { Area, AreaChart, XAxis } from "recharts";

export default function EntryProgress({data} : {data : BalanceData[]}) {

    const chartConfig:ChartConfig = {
        debit : {
            label : "Debit",
            color: "var(--chart-1)",
        },
        credit : {
            label : "Debit",
            color: "var(--chart-2)",
        },
    }

    return (
        <Card >
            <CardHeader>
                <CardTitle>Ledger Entries</CardTitle>
            </CardHeader>

            <CardContent>
                <ChartContainer className="w-full h-116" config={chartConfig}>
                    <AreaChart accessibilityLayer data={data}>
                        <XAxis dataKey="label" tickMargin={8} />
                        <ChartTooltip />
                        <Area dataKey="debit" type={"basis"} stackId="a" fill="var(--color-debit)" fillOpacity={0.4} stroke="var(--color-debit)" />
                        <Area dataKey="credit" type={"basis"} stackId="a" fill="var(--color-credit)" fillOpacity={0.4} stroke="var(--color-credit)"/>
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}