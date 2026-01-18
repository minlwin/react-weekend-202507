import IconLink from "@/components/widgets/icon-link";
import SignOutMenu from "@/components/widgets/signout-menu";
import React from "react";

export default async function AdminLayout({children} : {children : React.ReactNode}) {
        
    return (
        <div className="min-h-screen">
            <nav className="px-6 py-4 shadow flex items-center justify-between">
                <IconLink icon="Home" url="/admin" title="ADMIN HOME" className="font-semibold" />

                <div className="flex items-center gap-8">
                    <IconLink url="/admin/members" icon="Users" title="Member Management" />
                    <SignOutMenu />
                </div>
            </nav>
            <main className="px-6 py-4">
                {children}
            </main>
        </div>
    )
}