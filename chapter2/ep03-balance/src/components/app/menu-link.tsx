import Link from "next/link"
import React from "react"

type MenuLinkProps = {
    name: string
    path: string
    nativeLink?: boolean
    children?: React.ReactNode
}

export default function MenuLink({name, path, children, nativeLink} : MenuLinkProps) {

    if(nativeLink) {
        return (
            <a href={`#${path}`} className="flex gap-1 items-center px-2 py-4">
                {children}
                <span>{name}</span>
            </a>
        )
    }

    return (
        <Link href={path} className="flex gap-1 items-center px-2 py-4">
            {children}
            <span>{name}</span>
        </Link>
    )
}