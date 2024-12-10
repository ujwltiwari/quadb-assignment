import Chair from "@/assets/images/chair.png";
import Toaster from "@/assets/images/toaster.png";
import Cupboard from "@/assets/images/cupboard.png";
import { GoArrowRight } from "react-icons/go";

const localImages = [
  {
    image: Chair,
    title: "Living Room",
    link: "#",
  },
  {
    image: Cupboard,
    title: "Living Room",
    link: "#",
  },
  {
    image: Toaster,
    title: "Kitchen",
    link: "#",
  },
];

const BannerGrid = ({ images }) => {
  images = localImages;
  return (
    <div className="flex gap-4">
      {images.length > 0 && (
        // Single grid: Render the first image separately
        <div
          className={`max-h-[664px] w-1/2 relative bg-contain bg-bottom`}
          style={{ backgroundImage: `url(${images[0].image})` }}
        >
          <h4 className="text-[34px] font-semibold absolute top-10 left-10">
            {images[0].title}
          </h4>
          <ShopNow className="absolute top-24 left-10" />
        </div>
      )}

      {/* Non-single grid: Group the remaining images inside one flex-col container */}
      {images.length > 1 && (
        <div className="h-full w-1/2 flex flex-col gap-4">
          {images.slice(1).map((image, idx) => (
            <div
              className={`h-[332px] w-full relative bg-cover bg-bottom`}
              style={{ backgroundImage: `url(${image.image})` }}
              key={idx}
            >
              <h4 className="text-[34px] font-semibold absolute top-10 left-10">
                {image.title}
              </h4>
              <ShopNow className="absolute top-24 left-10" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BannerGrid;

const ShopNow = ({ className }) => {
  return (
    <div
      className={`flex gap-2 items-center border-b border-[#141718] ${className ?? ""} `}
    >
      <p className="text-[16px] font-medium">Shop Now</p>
      <GoArrowRight size={20} />
    </div>
  );
};
