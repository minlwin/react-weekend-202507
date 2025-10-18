"use server"

import { signInRequest } from "../model/auth.client";
import { SignInForm, SignInResult } from "../model/auth.model";

export async function signInAction(form:SignInForm):Promise<SignInResult> {
    
    try {
        const response = await signInRequest(form)
        return {
            success: true,
            message: response.role
        }
    } catch (e) {
        const error = e as Error
        return {
            success: false,
            message: error?.message || "Sign In Error"
        }
    }   
}