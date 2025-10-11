import { House } from "lucide-react";
import Link from "next/link";

export default function AnonymousNavigation() {
    return (
        <nav className="sticky top-0 z-50 bg-white">
            <div className="px-16 py-4 flex justify-between items-end">
                <Link href={"/"} className="flex items-center gap-2"><House className="size-5"/> <span className="text-xl text-foreground/80">Java Developer Class</span></Link>
            
                <div className="space-x-6">
                    <Link className="hover:text-foreground/70" href="#">About Us</Link>
                    <Link className="hover:text-foreground/70" href="#">Our Course</Link>
                    <Link className="hover:text-foreground/70" href="#">Available Classes</Link>
                    <Link className="hover:text-foreground/70" href="#">Sign In</Link>
                </div>
            </div>
        </nav>
    )
}