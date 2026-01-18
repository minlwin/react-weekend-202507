'use server'

import { redirect } from "next/navigation";
import { PUT_CONFIG, secureRequest, secureSearch } from "..";
import { PageResult } from "../schema";
import { MemberDetails, MemberListItem, MemberSearch, MemberStatusForm } from "../schema/admin.member.schema";

export async function search(form : MemberSearch):Promise<PageResult<MemberListItem>> {
    const response = await secureSearch('admin/members', form)
    return await response.json()
}

export async function findById(id:any):Promise<MemberDetails> {
    const response = await secureSearch(`admin/members/${id}`)
    return await response.json()
}

export async function updateStatus(id: any, form: MemberStatusForm) {
    const response = await secureRequest(`admin/members/${id}`, {
        ...PUT_CONFIG,
        body: JSON.stringify(form)
    })

    const result = await response.json()

    redirect(`/admin/members/${result.id}`)
}