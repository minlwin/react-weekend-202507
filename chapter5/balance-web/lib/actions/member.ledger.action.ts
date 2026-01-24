import { secureSearch } from "..";
import { PageResult } from "../schema";
import { LedgerListItem, LedgerSearch } from "../schema/member.ledger.schema";

export async function search(form : LedgerSearch) : Promise<PageResult<LedgerListItem>> {
    const response = await secureSearch('member/ledgers', form)
    return await response.json()
}