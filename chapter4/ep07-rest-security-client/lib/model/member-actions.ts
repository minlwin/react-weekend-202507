'use server'

import { securedRequest } from "../rest-client";

export async function getMemberMessage(): Promise<string[]> {
    const response = await securedRequest("member")
    return await response.json()
}