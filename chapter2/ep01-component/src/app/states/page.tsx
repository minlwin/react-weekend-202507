'use client'

import { Button } from "@/components/ui/button"
import { Minus, Plus } from "lucide-react"
import { useState } from "react"

export default function ComponentState() {

    const [count, setCount] = useState<number>(0)

    return (
        <>
            <h1>Component States</h1>

            <div className="flex flex-col items-center">
                <div className="text-3xl mb-4">Count is : {count}</div>
                <div className="space-x-2">
                    <Button onClick={() => setCount(count - 1)}>
                        <Minus /> Count Down
                    </Button>
                    <Button onClick={() => setCount(count + 1)}>
                        <Plus /> Count Up
                    </Button>
                </div>
            </div>
        </>    
    )
}