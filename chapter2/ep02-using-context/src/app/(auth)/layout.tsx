import { Laptop } from "lucide-react";
import React from "react";

export default function AuthLayout({children} : {children : React.ReactNode}) {
    return (
        <div className="h-screen flex">
            <div className="bg-blue-800 text-white flex-1 flex flex-col items-center justify-center">
                <Laptop size={200} />
                <div className="text-center px-24 space-y-4">
                    <h1 className="text-2xl">Java Developer Class</h1>
                    <p>{"Welcome to the Java Developer Class (JDC), where we're dedicated to cultivating the next generation of software developers."}</p>
                </div>
            </div>
            <div className="flex-1 flex items-center justify-center">
                <section className="w-2/3">
                    {children}
                </section>
            </div>
        </div>
    )
}