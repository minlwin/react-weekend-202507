import { clsx, type ClassValue } from "clsx"
import { toast } from "sonner"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const POST_CONFIG:RequestInit = {
  method: "POST",
  headers: {
    "Content-Type" : "application/json"
  }
}

export const PUT_CONFIG:RequestInit = {
  method: "PUT",
  headers: {
    "Content-Type" : "application/json"
  }
}

export async function safeCall(action : () => Promise<void>) {
  try {
    await action()
  } catch(e:any) {
    toast("Message", {
      description: JSON.parse(e.message)
    })
  }
}