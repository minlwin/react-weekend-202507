import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "BALANCE | Balance",
  description: "Member Management page of Balance Application.",
};

export default function Layout({children} : {children : React.ReactNode}) {
    return (
        <>{children}</>
    )
}