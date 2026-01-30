'use client'

import { Pager } from "@/lib/schema"
import { NativeSelect, NativeSelectOption } from "../ui/native-select"
import { Input } from "../ui/input"
import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"

type PagerProps = {
    info?: Pager,
    onPageChange : (page:number) => void,
    onSizeChange : (size:number) => void
}

export default function PagerWidget({info, onPageChange, onSizeChange} : PagerProps) {

    if(info && info.count > 0) {
        return (
            <nav className="flex justify-between w-full">
                <div className="flex gap-6">
                    <div className="flex items-center gap-2">
                        <div>Page Size</div>
                        <NativeSelect value={10} onChange={e => onSizeChange(Number.parseInt(e.target.value))}>
                            <NativeSelectOption value={10}>10</NativeSelectOption>
                            <NativeSelectOption value={25}>25</NativeSelectOption>
                            <NativeSelectOption value={50}>50</NativeSelectOption>
                        </NativeSelect>
                    </div>

                    <div className="flex gap-2">
                        <Button variant={'outline'} disabled={info.page == 0} onClick={() => onPageChange(0)}>
                            <ArrowLeft />
                        </Button>
                        {info.links.map(a => 
                            <Button key={a} variant={a == info.page ? "default" : "outline"} onClick={() => onPageChange(a)}>
                                {a + 1}
                            </Button>
                        )}
                        <Button variant={'outline'} disabled={info.page == info.totalPages - 1} onClick={() => onPageChange(info.totalPages - 1)}>
                            <ArrowRight />
                        </Button>
                    </div>

                </div>

                <div className="flex gap-4">
                    <PageInformation label="Pages" value={info.totalPages} />
                    <PageInformation label="Count" value={info.count} />
                </div>
            </nav>
        )        
    }
    
    return <></>
}

function PageInformation({label, value, className} : {label : string, value : any, className? : string}) {
    return (
        <div className="flex gap-2 items-center">
            <div className="text-nowrap">{label}</div>
            <Input readOnly={true} value={value} className={cn("text-center", className ? className : "w-16")} />
        </div>
    )
}