import Link from "next/link";

export default function TopMenu() {
    return (
        <header className="bg-black text-white px-8 py-4">
            <nav className="flex justify-between">
                <Link href={"/"}>CRUD HOME</Link>

                <div className="space-x-8">
                    <Link href={"/divisions"}>Divisions</Link>
                    <Link href={"/divisions"}>Districts</Link>
                </div>
            </nav>
        </header>
    )
}