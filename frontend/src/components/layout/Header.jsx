import { headerItems, headerIcons } from "@/constants/header.js";
import { createElement } from "react";
import { Separator } from "@/components/ui/separator.jsx";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const cart = useSelector((state) => state.cart.cart);
  console.log(cart);
  return (
    <>
      <header className="flex justify-between pt-4">
        <Link
          to="/"
          className="scroll-m-20 text-[25px] font-semibold tracking-tight"
        >
          3legant
        </Link>
        <div className="sm:flex gap-12 items-center hidden">
          {headerItems.map((item, idx) => (
            <Link
              key={idx}
              to={item.link}
              className="leading-7 font-medium text-[14px] cursor-pointer"
            >
              {item.title}
            </Link>
          ))}
        </div>
        <div className="flex gap-6 items-center cursor-pointer">
          {headerIcons.map((item, idx) => {
            const cartCount = item.title === "Cart";
            const hasLink = item.link;
            return (
              <Link to={`${hasLink ? item.link : "#"}`} key={idx}>
                <div key={idx} className={cartCount ? "relative" : ""}>
                  {createElement(item.icon, {
                    width: 26,
                    height: 26,
                    size: 26,
                  })}
                  {cartCount && (
                    <p className="text-[10px] text-white flex items-center justify-center w-[18px] h-[18px] rounded-full font-medium absolute top-[-10px] right-[-6px] bg-[#141718]">
                      {cart.length}
                    </p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </header>
      <Separator className="my-4" />
    </>
  );
};

export default Header;
