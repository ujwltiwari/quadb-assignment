// import SaleContent from "./SaleContent";
// import ShopNowButton from "./ShopNowButton";
import Banner from "@/assets/images/footer-banner.png";
import { BiLeftArrow } from "react-icons/bi";
import { GoArrowRight } from "react-icons/go";
const FooterBanner = () => {
  return (
    <section className="flex gap-5 max-md:flex-col my-4 mt-8">
      <div className="w-1/2">
        <img
          loading="lazy"
          src={Banner}
          alt="Sale promotional image"
          className="object-fill h-full grow w-full aspect-[1.35] max-md:max-w-full"
        />
      </div>
      <div className="flex flex-col w-1/2 max-md:ml-0 max-md:w-full">
        <div className="flex flex-col justify-center items-start pr-40 pl-20 mx-auto w-full bg-gray-100 min-h-[532px] text-neutral-900 max-md:px-5 max-md:max-w-full">
          <p className="text-base font-bold leading-none text-blue-500 uppercase max-md:max-w-full">
            SALE UP TO 35% OFF
          </p>
          <h1 className="mt-4 text-4xl font-medium tracking-tight leading-10 max-md:max-w-full text-left">
            HUNDREDS of <br /> New lower prices!
          </h1>
          <p className="mt-4 text-xl leading-8 max-md:max-w-full text-left">
            Its more affordable than ever to give every room in your home a
            stylish makeover
          </p>
          <button className="flex gap-1 items-center mt-6 text-base font-medium tracking-tight leading-7 border-b border-solid border-b-neutral-900">
            <span className="gap-1 self-stretch my-auto">Shop Now</span>
            <GoArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FooterBanner;
