import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ChartData } from "@/lib/schema/admin/summary.schema";
import { Pie, PieChart } from "recharts";

export default function SummaryChart({title, data} : {title: string, data : ChartData[]}) {
    
    const chartConfig:ChartConfig = {}

    data.forEach((item, index) => {
        chartConfig[item.label.toLowerCase()] = {
            label : item.label,
            color : `var(--chart-${index + 1})`
        }
    })

    const chartData = data.map(item => ({
        ...item,
        fill : `var(--color-${item.label.toLowerCase()})`
    }))

    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>

            <CardContent>
                <ChartContainer config={chartConfig}>
                    <PieChart >
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                            />
                        <Pie data={chartData} dataKey="value" nameKey="label" />     
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}