import IconLink from "@/components/widgets/icon-link";
import SignOutMenu from "@/components/widgets/signout-menu";
import { getLoginUser, isLogIn } from "@/lib/login-user";
import { redirect } from "next/navigation";
import React from "react";

export default async function MemberLayout({children} : {children : React.ReactNode}) {
    
    const authenticated = await isLogIn()
    if(!authenticated) {
        redirect("/signin")
    }

    if(authenticated) {
        const user = await getLoginUser()
        if(user.role != "Member") {
            redirect(`/${user.role.toLocaleLowerCase()}?message=You can't access to Member Home.`)
        }
    }

    return (
        <div className="min-h-screen">
            <nav className="px-6 py-4 shadow flex items-center justify-between bg-blue-800 text-white ">
                <IconLink icon="Home" url="/member" title="BALANCE HOME" className="font-semibold" />

                <div className="flex items-center gap-8">
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