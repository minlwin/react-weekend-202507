import { redirect } from "next/navigation"
import { getAccessToken, getRefreshToken, setAuthResult } from "./login-user-info"
import { POST_CONFIG } from "./utils"

export async function publicRequest(
    path:string, 
    options: RequestInit = {}) {
    const url = `${process.env.BASE_URL}/${path}`
    const response = await fetch(url, options)

    if(!response.ok) {
        const message = await response.json() 
        throw JSON.stringify(message)
    }

    return response
}

export async function securedRequest(
    path:string, 
    options: RequestInit = {}) {
        
    let response : Response | undefined

    async function fetchWithToken(token : string) {
        return await fetch(`${process.env.BASE_URL}/${path}`, {
            ...options,
            headers: {
                ...options.headers,
                ...(token && {"Authorization" : `Bearer ${token}`})
            }
        })
    }
    
    const accessToken = await getAccessToken()

    if(!accessToken) {
        redirect("/signin")
    }

    response = await fetchWithToken(accessToken)

    // Token Expiration
    if(response?.status === 410) {
        const refreshToken = await getRefreshToken()

        const refreshResponse = await fetch(`${process.env.BASE_URL}/auth/refresh`, {
            ...POST_CONFIG,
            body: JSON.stringify({
                token: refreshToken
            })
        })

        if(refreshResponse.ok) {
            const result = await refreshResponse.json()
            await setAuthResult(result)
            response = await fetchWithToken(result.accessToken)
        } else {
            redirect("/signin")
        }
    }

    if(!response || response.status === 401) {
        redirect("/signin")
    }

    if(response?.status === 400 || response?.status === 500) {
        throw await response.json()
    }

    return response
}