import { Button } from "@/components/ui/button";
import { Code2 } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function AuthLayout({children} : {children : React.ReactNode}) {
    return (
        <div className="h-screen flex">
            <div className="flex-1 bg-blue-900 flex flex-col items-center justify-center">
                <Code2 className="text-white size-24" />
                <h1 className="text-white text-xl font-semibold mb-4">Java Developer Class</h1>
                <Button asChild variant={"outline"}>
                    <Link href={"/"}>
                        Home
                    </Link>
                </Button>
            </div>

            <div className="flex-1 flex items-center justify-center">

                <main className="w-2/3">
                    {children}
                </main>
            </div>
        </div>
    )
}