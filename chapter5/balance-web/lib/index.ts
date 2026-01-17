import { redirect } from "next/navigation"
import { getAccessToken, getRefreshToken, setAuthResult } from "./login-user"
import { AuthResult } from "./schema/auth.schema"

export async function publicRequest(path:string, options : RequestInit = {}) {
    const response = await fetch(url(path), options)

    if(!response.ok) {
        const message = await response.json()
        throw JSON.stringify(message)
    }

    return response
}

export async function secureRequest(path:string, options : RequestInit = {}) {

    let response : Response | undefined

    async function fetchWithToken(token : string) {
        return await fetch(url(path), {
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

    if(response.status === 410) {
        const refreshToken = await getRefreshToken()

        if(!refreshToken) {
            redirect("/signin")        
        }

        const refreshResponse = await publicRequest("/auth/refresh", {
            ...POST_CONFIG,
            body: JSON.stringify({
                token : refreshToken
            })
        })

        if(!refreshResponse.ok) {
            redirect("/signin")
        }

        const authResult = await refreshResponse.json() as AuthResult
        await setAuthResult(authResult)

        response = await fetchWithToken(authResult.accessToken)
    }    

    if(!response || response.status === 401) {
        redirect("/signin")        
    }

    if(response.status === 400 
        || response.status === 403 
        || response.status === 500) {
        const message = await response.json()
        throw JSON.stringify(message)
    }

    return response
}

function url(path:string) {
    return `${process.env.BACKEND_URL}/${path}`
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