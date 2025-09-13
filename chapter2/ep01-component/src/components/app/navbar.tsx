import Link from "next/link"

export type MenuItem = {
    name : string
    url : string
}

type NavbarPops = {
    home:MenuItem, 
    menus: MenuItem[]
}

export default function Navbar({home, menus} : NavbarPops) {
    return (
        <nav className="flex justify-between items-center px-8 py-4 bg-gray-700 text-white">
            <Link className="font-bold text-xl" href={home.url}>{home.name}</Link>

            <ul className="flex gap-4">
                {menus.map((item, index) => 
                    <li key={index}>
                        <Link href={item.url}>{item.name}</Link>
                    </li>
                )}
            </ul>
        </nav>
    )
}