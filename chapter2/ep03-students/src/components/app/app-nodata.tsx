import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";

export default function NoData({message} : {message : string}) {
    return (
        <Card>
            <CardContent className="space-y-4">
                <CardTitle>No Data</CardTitle>
                <CardDescription>{message}</CardDescription>
            </CardContent>
        </Card>
    )
}