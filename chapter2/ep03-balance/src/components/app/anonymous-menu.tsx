import { Book, Home, Info, ShoppingBag, Unlock } from "lucide-react";
import MenuLink from "./menu-link";

export default function AnonymousMenu() {
    return (
        <nav className="flex px-12 justify-between">
            <MenuLink name="Balance Home" path="/">
                <Home size={18} />
            </MenuLink>

            <div className="flex gap-1">
                <MenuLink name="About Us" path="aboutUs" nativeLink={true}>
                    <Info size={18} /> 
                </MenuLink>
                <MenuLink name="Pricing" path="pricing" nativeLink={true}>
                    <ShoppingBag size={18} /> 
                </MenuLink>
                <MenuLink name="Terms and Condition" path="terms" nativeLink={true}>
                    <Book size={18} /> 
                </MenuLink>
                <MenuLink name="Sign In" path="/signin">
                    <Unlock size={18} /> 
                </MenuLink>
            </div>
        </nav>
    )
}

