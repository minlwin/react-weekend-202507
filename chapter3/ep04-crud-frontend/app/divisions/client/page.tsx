'use client'

import DivisionView from "@/components/app/division-data"
import { DivisionListItem } from "@/lib/dto/division.dto"
import { useEffect, useState } from "react"

export default function DivisionsWithClientComponent() {

    const [divisions, setDivisions] = useState<DivisionListItem[]>([])

    useEffect(() => {

        async function load() {
            const response = await fetch("http://localhost:8080/divisions")
            const result = await response.json()
            setDivisions(result)
        }

        load()

    }, [setDivisions])

    return (
        <DivisionView list={divisions} />
    )
}