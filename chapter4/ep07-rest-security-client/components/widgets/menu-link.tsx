import Link from "next/link";
import IconWedget, { LucideIconType } from "./icon-widget";

export default function MenuLink({icon, name, href} : {icon : LucideIconType, name : string, href : string}) {
    return (
        <Link href={href} className="flex gap-1 items-center">
            <IconWedget className="size-4" name={icon} />
            <span>{name}</span>
        </Link>
    )
}