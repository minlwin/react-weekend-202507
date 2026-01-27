import 'server-only'

import { redirect } from "next/navigation"
import { clearAuthResult, getAccessToken, getRefreshToken, setAuthResult } from "./login-user"
import { AuthResult } from "./schema/anonymous/auth.schema"
import { ApplicationError } from './schema'

export async function publicRequest(path:string, options : RequestInit = {}, search? : {[key:string] : any}) {
    const response = await fetch(url(path, search), options)

    if(!response.ok) {
        const message = await response.json()
        throw JSON.stringify(message)
    }

    return response
}

export async function secureRequest(path:string, options : RequestInit = {}, search? : {[key:string] : any}) {

    let response : Response | undefined

    async function fetchWithToken(token : string) {
        return await fetch(url(path, search), {
            ...options,
            headers: {
                ...options.headers,
                ...(token && {"Authorization" : `Bearer ${token}`})
            }
        })
    }

    const accessToken = await getAccessToken()

    if(!accessToken) {
        await clearAuthResult()
        const error:ApplicationError = {
            logout : true,
            message : ["No Access Token"]
        }
        throw JSON.stringify(error)
    }

    response = await fetchWithToken(accessToken)

    if(response.status === 410) {
        const refreshToken = await getRefreshToken()

        if(!refreshToken) {
            await clearAuthResult()
            const error:ApplicationError = {
                logout : true,
                message : await response.json()
            }
            throw JSON.stringify(error)
        }

        const refreshResponse = await publicRequest("/auth/refresh", {
            ...POST_CONFIG,
            body: JSON.stringify({
                token : refreshToken
            })
        })

        if(!refreshResponse.ok) {
            await clearAuthResult()
            const error:ApplicationError = {
                logout : true,
                message : await response.json()
            }
            throw JSON.stringify(error)
        }

        const authResult = await refreshResponse.json() as AuthResult
        await setAuthResult(authResult)

        response = await fetchWithToken(authResult.accessToken)
    }    

    if(!response 
        || response.status === 403 
        || response.status === 401) {
            await clearAuthResult()
        const error:ApplicationError = {
            logout : true,
            message : await response.json()
        }
        throw JSON.stringify(error)
    }

    if(response.status === 400 
            || response.status === 500) {
        
        const error:ApplicationError = {
            logout : false,
            message : await response.json()
        }

        throw JSON.stringify(error)
    }

    return response
}

export async function publicSearch(path:string, search? : {[key:string] : any}) {
    return publicRequest(path, {}, search)
}

export async function secureSearch(path:string, search? : {[key:string] : any}) {
    return secureRequest(path, {}, search)
}

function url(path:string, search? : {[key:string] : any}) {
    
    const url = new URL(`${process.env.BACKEND_URL}/${path}`)
    
    if(search) {
        url.search = new URLSearchParams(search).toString()
    }
    
    return url.toString()
}

export const POST_CONFIG:RequestInit = {
    method: 'POST',
    headers: {
        "Content-Type" : "application/json"
    }
}

export const PUT_CONFIG:RequestInit = {
    method: 'PUT',
    headers: {
        "Content-Type" : "application/json"
    }
}