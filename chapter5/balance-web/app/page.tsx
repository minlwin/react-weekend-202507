import { Button } from "@/components/ui/button";
import SignOutButton from "@/components/widgets/signout-button";
import { isLogIn } from "@/lib/login-user";
import { LogIn, PieChart, UserPlus } from "lucide-react";
import Link from "next/link";

export default async function Home() {

  const authenticated = await isLogIn()

  return (
    <main className="bg-blue-100 h-screen flex flex-col items-center justify-center gap-4">
      <PieChart className="size-20" />
      
      <h1 className="text-3xl font-semibold text-gray-900">Balance Application</h1>
      
      <div className="w-1/2 text-center text-gray-700">Take Control of Your Shared Finances. Manage group income and track collective expenses with total transparency. Whether it’s a household, a club, or a project team, we make sure every cent is accounted for so you can focus on what matters.</div>
      

      {!authenticated &&
        <div className="space-x-2">
          <Button asChild>
            <Link href='/signin'>
              <LogIn /> Sign In
            </Link>
          </Button>

          <Button asChild>
            <Link href='/signup'>
              <UserPlus /> Sign Up
            </Link>
          </Button>
        </div>
      }

      {authenticated && 
        <SignOutButton />
      }

    </main>
  )
}