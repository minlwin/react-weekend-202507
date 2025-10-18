import React from "react";
import * as lucideIcons from 'lucide-react'

export default function PageTitle({title, icon} : {title:string, icon: keyof typeof lucideIcons}) {
    const LucideIconType = lucideIcons[icon] as lucideIcons.LucideIcon
    return (
        <h1 className="flex items-center gap-2 mb-4">
            <LucideIconType className="size-5" />
            <span className="text-xl">{title}</span>
        </h1>
    )
}