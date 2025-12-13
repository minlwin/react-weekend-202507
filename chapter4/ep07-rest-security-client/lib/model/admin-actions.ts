'use server'

import { securedRequest } from "../rest-client"

export async function getAdminMessages():Promise<string[]> {
    const response = await securedRequest('admin')
    return await response.json()
}