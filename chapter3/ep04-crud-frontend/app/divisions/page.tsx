import DivisionView from "@/components/app/division-data"
import { DivisionListItem } from "@/lib/dto/division.dto"

export default async function DivisionHome() {

    const response = await fetch("http://localhost:8080/divisions")
    const divisions:DivisionListItem[] = await response.json()

    return (
        <DivisionView list={divisions} />
    )
}