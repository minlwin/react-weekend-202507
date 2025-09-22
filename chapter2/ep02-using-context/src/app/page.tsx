import { DoorOpen } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Link href={"/signin"}>
        <DoorOpen /> Sign In
      </Link>
    </>
  )
}