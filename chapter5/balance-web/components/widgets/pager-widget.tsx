'use client'

import { Pager } from "@/lib/schema"

type PagerProps = {
    info: Pager,
    onPageChange : (page:number) => void,
    onSizeChange : (size:number) => void
}

export default function PagerWidget({info, onPageChange, onSizeChange} : PagerProps) {

    if(info) {
        return (
            <nav>

            </nav>
        )        
    }
    
    return <></>
}