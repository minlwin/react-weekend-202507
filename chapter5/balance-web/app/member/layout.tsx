import IconLink from "@/components/widgets/icon-link";
import SignOutMenu from "@/components/widgets/signout-menu";
import React from "react";

export default async function MemberLayout({children} : {children : React.ReactNode}) {
    
    return (
        <div className="min-h-screen">
            <nav className="px-6 py-4 shadow flex items-center justify-between bg-blue-800 text-white ">
                <IconLink icon="Home" url="/member" title="BALANCE HOME" className="font-semibold" />

                <div className="flex items-center gap-8">
                    <IconLink url="/member/balances" icon="PieChart" title="Balances" />
                    <IconLink url="/member/debit" icon="ArrowDownRight" title="Debit" />
                    <IconLink url="/member/credit" icon="ArrowUpRight" title="Credit" />
                    <IconLink url="/member/ledgers" icon="Users" title="Ledgers" />
                    <SignOutMenu />
                </div>
            </nav>
            <main className="px-6 py-4">
                {children}
            </main>
        </div>
    )
}