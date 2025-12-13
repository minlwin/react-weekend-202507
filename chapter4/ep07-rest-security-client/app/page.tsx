import MenuLink from "@/components/widgets/menu-link";

export default function Home() {
  return (
    <div>
      <nav className="bg-teal-800 text-white py-4 px-16 flex justify-between items-center">
        <h1 className="font-semibold text-xl">Security Demo</h1>

        <div>
          <MenuLink icon="DoorOpen" href="/signin" name="Sing In" />
        </div>
      </nav>
    </div>
  )
}