'use client'

import DivisionView from "@/components/app/division-data"
import { DivisionListItem } from "@/lib/dto/division.dto"
import { useEffect, useState } from "react"

import * as divisionClient from '@/lib/actions/division-client'

export default function DivisionsWithServerAction() {

    const [divisions, setDivisions] = useState<DivisionListItem[]>([])

    useEffect(() => {
        async function load() {
            const result = await divisionClient.findAll()
            setDivisions(result)
        }

        load()
    }, [setDivisions])

    return (
        <DivisionView list={divisions} />
    )
}