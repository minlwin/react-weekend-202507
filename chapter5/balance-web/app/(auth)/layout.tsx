import { Button } from "@/components/ui/button";
import { HomeIcon, PieChart } from "lucide-react";
import Link from "next/link";
import React from "react";
import Home from "../page";

export default function AuthLayout({children} : {children : React.ReactNode}) {
    return (
        <div className="h-screen flex">

            <div className="w-full bg-blue-800 text-white flex flex-col items-center justify-center gap-4">
                <PieChart className="size-20" />
                <h1 className="text-2xl">Balance Application</h1>
                <div className="w-1/2 text-center">Welcome back! Ready to check in on your budget? Sign in to view your latest balances and keep your group’s finances on track.</div>
                <div>
                    <Button variant='secondary' asChild>
                        <Link href="/">
                            <HomeIcon /> Home
                        </Link>
                    </Button>
                </div>
            </div>

            <main className="w-full flex items-center justify-center">
                <section className="w-1/2">
                    {children}
                </section>
            </main>
        </div>
    )
}