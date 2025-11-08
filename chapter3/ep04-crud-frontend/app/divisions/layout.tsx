import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import React from "react";

export default function DivisionLayout({children} : {children : React.ReactNode}) {
    return (
        <div>

            <Tabs defaultValue="server">
                <TabsList>
                    <TabsTrigger value="server" asChild>
                        <Link href={"/divisions"}>Server Side Component</Link>
                    </TabsTrigger>

                    <TabsTrigger value="client" asChild>
                        <Link href={"/divisions/client"}>Client Side Component</Link>
                    </TabsTrigger>

                    <TabsTrigger value="action" asChild>
                        <Link href={"/divisions/action"}>Using Server Action</Link>
                    </TabsTrigger>
                </TabsList>
            </Tabs>           

            <section className="mt-4">
                {children}
            </section>
        </div>
    )
}