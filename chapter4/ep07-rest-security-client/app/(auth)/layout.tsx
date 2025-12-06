import MenuLink from "@/components/widgets/menu-link";
import { Laptop } from "lucide-react";
import React from "react";

export default function AuthLayout({children} : {children : React.ReactNode}) {
    return (
        <div className="h-screen flex">
            <div className="bg-teal-800 text-white flex-1 flex flex-col gap-2 justify-center items-center">
                <Laptop className="size-36" />
                <h1 className="font-semibold text-3xl">Security Demo</h1>
                <MenuLink icon="ArrowLeft" href="/" name="Home" />
            </div>

            <main className="flex-1 flex justify-center items-center">
                {children}
            </main>
        </div>
    )
}