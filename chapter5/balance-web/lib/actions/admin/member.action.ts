'use server'

import { PUT_CONFIG, secureRequest, secureSearch } from "../..";
import { DataModificationResult, PageResult } from "../../schema";
import { MemberDetails, MemberListItem, MemberSearch, MemberStatusForm } from "../../schema/admin/member.schema";

export async function search(form : MemberSearch):Promise<PageResult<MemberListItem>> {
    const response = await secureSearch('admin/members', form)
    return await response.json()
}

export async function findById(id:any):Promise<MemberDetails> {
    const response = await secureSearch(`admin/members/${id}`)
    return await response.json()
}

export async function updateStatus(id: any, form: MemberStatusForm) : Promise<DataModificationResult<number>> {
    const response = await secureRequest(`admin/members/${id}`, {
        ...PUT_CONFIG,
        body: JSON.stringify(form)
    })

    return await response.json()
}