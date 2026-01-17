import Link from "next/link";
import IconWidget, { IconType } from "./icon-widget";
import { cn } from "@/lib/utils";

export default function IconLink({url, icon, title, className} : {url: string, icon : IconType, title? : string, className?: string}) {
    
    if(title) {
        return (
            <Link href={url} className={cn("flex items-center gap-2", className)}>
                <IconWidget className="size-5" icon={icon} />
                {title}
            </Link>
        )
    }
    
    return (
        <Link href={url}>
            <IconWidget className="size-5" icon={icon} />
        </Link>
    )
}