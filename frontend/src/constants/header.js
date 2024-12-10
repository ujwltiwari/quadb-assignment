import { CiSearch } from "react-icons/ci";
import Cart from "@/assets/icons/Cart.jsx";
import { VscAccount } from "react-icons/vsc";

export const headerItems = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "Shop",
    link: "/shop",
  },
  {
    title: "Product",
    link: "/",
  },
  {
    title: "Contact Us",
    link: "/",
  },
];

export const headerIcons = [
  { icon: CiSearch, title: "Search" },
  { icon: Cart, title: "Cart", link: "/cart" },
  { icon: VscAccount, title: "Account" },
];
