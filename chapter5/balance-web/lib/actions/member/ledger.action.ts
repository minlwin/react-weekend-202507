"use server"

import { POST_CONFIG, PUT_CONFIG, secureRequest, secureSearch } from "../..";
import { DataModificationResult, PageResult } from "../../schema";
import { LedgerCreateFrom, LedgerDetails, LedgerEditForm, LedgerListItem, LedgerSearch, LedgerUploadResult } from "../../schema/member/ledger.schema";

export async function search(form : LedgerSearch) : Promise<PageResult<LedgerListItem>> {
    const response = await secureSearch('member/ledgers', form)
    return await response.json()
}

export async function findById(code : string) : Promise<LedgerDetails> {
    const response = await secureSearch(`member/ledgers/${code}`)
    return await response.json()
}

export async function create(form : LedgerCreateFrom) : Promise<DataModificationResult<string>> {
    const response = await secureRequest('member/ledgers', {
        ...POST_CONFIG,
        body: JSON.stringify(form)
    })
    return await response.json()
}

export async function update(code: string, form: LedgerEditForm) : Promise<DataModificationResult<string>> {
    const response = await secureRequest(`member/ledgers/${code}`, {
        ...PUT_CONFIG,
        body: JSON.stringify(form)
    })
    return await response.json()
}

export async function updateStatus(code: string, deleted : boolean) : Promise<DataModificationResult<string>> {
    const response = await secureRequest(`member/ledgers/${code}/status`, {
        ...PUT_CONFIG,
        body: JSON.stringify({deleted : deleted})
    })
    return await response.json()
}

export async function upload(form : FormData) : Promise<LedgerUploadResult> {
    const response = await secureRequest(`member/ledgers/upload`, {
        method: "POST",
        body: form
    })
    return await response.json()
}