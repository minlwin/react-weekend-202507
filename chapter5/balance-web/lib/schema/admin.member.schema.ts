import z from "zod"
import { PageSearch } from "."

export type MemberSearch = {
    disabled? : string
    from? : string
    to? : string
    keyword? : string
} & PageSearch

export type MemberListItem = {
    id: number
    name: string
    email: string
    disabled: boolean
    registeredAt: string
}

export type MemberDetails = {
    ledgers: number
    entries: number
} & MemberListItem

export const MemberStatusSchema = z.object({
    disabled : z.string().nonempty("Please select status.")
})

export type MemberStatusForm = z.infer<typeof MemberStatusSchema>