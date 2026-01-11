import IconWidget, { IconType } from "./icon-widget";

export default function PageTitle({title, icon} : {title : string, icon? : IconType}) {
    if(icon) {
        return (
            <h1 className="flex items-center gap-2 text-xl">
                <IconWidget icon={icon} className="size-5" />
                <span>{title}</span>
            </h1>
        )
    }

    return (
        <h1>{title}</h1>
    )
}