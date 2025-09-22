import React from "react"
import { Label } from "../ui/label"

type FormGroupPops = {
    label? : string
    className? : string
    children: React.ReactNode
}

export default function FormGroup({label, className, children} : FormGroupPops) {

    return (
        <div className={className}>
            {label && 
                <Label className="mb-2 text-gray-600">{label}</Label>
            }
            {children}
        </div>
    )
}