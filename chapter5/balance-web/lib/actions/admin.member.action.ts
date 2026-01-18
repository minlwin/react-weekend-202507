'use server'

import { secureSearch } from "..";
import { PageResult } from "../schema";
import { MemberListItem, MemberSearch } from "../schema/admin.member.schema";

export async function search(form : MemberSearch):Promise<PageResult<MemberListItem>> {
    const response = await secureSearch('admin/members', form)
    return await response.json()
}