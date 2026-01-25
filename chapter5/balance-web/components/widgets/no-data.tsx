import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

export default function NoData({name} : {name : string}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>No Result</CardTitle>
                <CardDescription>{`There is no ${name} data.`}</CardDescription>
            </CardHeader>
        </Card>
    )
}