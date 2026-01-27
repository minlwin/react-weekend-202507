import { Loader } from "lucide-react";
import { Card, CardContent } from "../ui/card";

export default function Loading({data} : {data? : string}) {
    return (
        <div className="w-full lg:w-1/2">
            <Card>
                <CardContent className="flex gap-4 items-center">
                    <Loader className="animate-spin size-8" />
                    <div className="text-xl animate-pulse">{`Trying to load ${data ? data : "data"}`}</div>
                </CardContent>
            </Card>
        </div>
    )
}