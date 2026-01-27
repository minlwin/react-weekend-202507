import { clsx, type ClassValue } from "clsx"
import { toast } from "sonner"
import { twMerge } from "tailwind-merge"
import { ApplicationError } from "./schema"
import { signOutAction } from "./actions/anonymous/auth.action"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function safeCall(action : () => Promise<void>) {

  try {
    await action()
  } catch (e:any) {

    if(e.message == "NEXT_REDIRECT") {
      return
    }

    try {
      const error:ApplicationError = JSON.parse(e.message)

      if(error.logout 
          || error.message[0] == "Authentication Error."
        ) {
        await signOutAction()
      } else {
        toast("Message", {
          description: error.message
        })
      }
    } catch (ex:any) {
      await signOutAction()
    }
  }
}

export function getLastMonthFirstDay() {
  const today = new Date
  today.setMonth(today.getMonth() - 1)
  const month = new String(today.getMonth() + 1).padStart(2, '0')
  return `${today.getFullYear()}-${month}-01`
}