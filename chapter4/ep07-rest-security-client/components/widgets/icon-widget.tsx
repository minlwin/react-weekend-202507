import * as LucideIcons from 'lucide-react'

export type LucideIconType = keyof typeof LucideIcons;

export default function IconWedget({name, className} : {name : LucideIconType, className? : string}) {
    const Icon = LucideIcons[name] as LucideIcons.LucideIcon
    return (
        <Icon className={className} />
    )
}