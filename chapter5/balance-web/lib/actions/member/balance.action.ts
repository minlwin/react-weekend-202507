'use server'

import { secureSearch } from "@/lib";
import { PageResult } from "@/lib/schema";
import { BalanceDetails, BalanceListItem, BalanceSearch } from "@/lib/schema/member/balance.schema";

export async function search(form : BalanceSearch) : Promise<PageResult<BalanceListItem>> {
    const response = await secureSearch('member/balance', form)
    return await response.json()
}

export async function downloadExcel(form : BalanceSearch) {
    const {page, size, ...rest} = form
    const response = await secureSearch('member/balance/export', rest)
    return await response.arrayBuffer()
}

export async function findById(id : any) : Promise<BalanceDetails> {
    const response = await secureSearch(`member/balance/${id}`)
    return await response.json()
}


