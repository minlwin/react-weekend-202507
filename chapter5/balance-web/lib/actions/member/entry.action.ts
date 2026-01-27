'use server'

import { POST_CONFIG, PUT_CONFIG, secureRequest, secureSearch } from "@/lib";
import { DataModificationResult, PageResult } from "@/lib/schema";
import { EntryForm, EntryListItem, EntrySearch, LedgerEntryPk } from "@/lib/schema/member/entry.schema";
import { LedgerType } from "@/lib/schema/member/ledger.schema";

export async function search(type: LedgerType, form : EntrySearch) : Promise<PageResult<EntryListItem>> {
    const response = await secureSearch(`member/entries/${type}`, form)
    return await response.json()
}

export async function downloadExcel(type: LedgerType, form : EntrySearch) {
    const {page, size, ...rest} = form
    const response = await secureSearch(`member/entries/${type}/export`, rest)
    return await response.arrayBuffer()
}

export async function create(form : EntryForm) : Promise<DataModificationResult<LedgerEntryPk>> {
    const response = await secureRequest('member/entries', {
        ...POST_CONFIG,
        body: JSON.stringify(form)
    })
    return await response.json()
}

export async function update(id : any, form : EntryForm)  : Promise<DataModificationResult<LedgerEntryPk>> {
    const response = await secureRequest(`member/entries/${id}`, {
        ...PUT_CONFIG,
        body: JSON.stringify(form)
    })
    return await response.json()
}