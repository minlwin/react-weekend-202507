import AppFooter from "@/components/app/app-footer";
import AnonymousNavigation from "@/components/app/nav-anonymous";
import React from "react";

export default function AnonymousLayout({children} : {children : React.ReactNode}) {
    return (
        <div>
            <div className="sticky top-0 z-50 bg-white shadow">
                <AnonymousNavigation />
            </div>

            <main className="px-8 py-4">
                {children}
            </main>

            <AppFooter />
        </div>
    )
}