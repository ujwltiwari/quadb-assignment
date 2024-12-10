import axios from "axios";
import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout.jsx";
import Footer from "@/components/layout/Footer.jsx";
import Sidebar from "@/modules/Admin/components/Sidebar.jsx";
import { calculateDiscount } from "@/helpers/helpers.js";
import { Link } from "react-router-dom";
import Img from "@/components/Img.jsx";
import { Heart } from "lucide-react";
import Loader from "@/components/Loader.jsx";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const getAllProducts = async () => {
    const result = await axios.get("http://localhost:3000/products");
    setProducts(result.data);
    setLoading(false);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  console.log(products);
  return (
    <>
      <div>
        <Layout />
        <div className="flex">
          <Sidebar className="w-1/5 max-w-[240px]" />
          <div className="w-[80%] bg-[#F5F6FA] p-10 relative">
            <h6 className="text-[24px] text-left">Products</h6>
            {loading ? (
              <div className="h-[400px] flex items-center justify-center">
                <Loader />
              </div>
            ) : (
              <>
                {products.length ? (
                  <div className="flex flex-wrap gap-4">
                    {products?.map((product) => {
                      const {
                        images,
                        title,
                        price,
                        isNew,
                        discount,
                        rating,
                        className,
                        _id,
                      } = product;
                      return (
                        <SingleProductCard
                          url={`/admin/product/${_id}`}
                          images={images}
                          title={title}
                          price={price}
                          isNew={false}
                          discount={discount}
                          rating={rating}
                          className="w-[48%] sm:w-[23%] my-3"
                          key={product.id}
                        />
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <p className="text-[24px] font-medium">No Products Found</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductsPage;

const SingleProductCard = ({
  images,
  title,
  price,
  isNew,
  discount,
  rating,
  className,
  url,
  showRating = false,
}) => {
  const discountedPrice = discount ? calculateDiscount(price, discount) : price;
  return (
    <Link
      to={url}
      className={`flex flex-col bg-[#F9F9F9] shadow-md rounded-md ${className ?? ""}`}
    >
      <div className={`w-full h-full relative rounded-md`}>
        {/*<img src={images?.[0] || Bulb} alt={title} className="h-full" />*/}
        <Img src={images?.[0] || Bulb} alt={title} className="" />
        {isNew ? (
          <div className="w-[70px] absolute top-5 left-5 font-semibold uppercase text-[14px] bg-white rounded-sm shadow-md px-4 py-[1px]">
            New
          </div>
        ) : null}
        {discount ? (
          <div
            className={`w-[70px] flex justify-center font-inter bg-[#38CB89] text-white absolute ${isNew ? "top-12" : "top-5"} left-5 font-semibold uppercase text-[14px] rounded-sm shadow-md px-4 py-[1px]`}
          >
            {`-${discount}%`}
          </div>
        ) : null}
        <div className="flex bg-white justify-between items-center">
          <div className=" p-4 flex flex-col flex-grow">
            {title && (
              <p className="text-[16px] font-light text-left font-inter">
                {title}
              </p>
            )}
            <div className="flex w-fit gap-2 justify-center">
              {price && (
                <p className="text-[14px] font-inter font-semibold text-left">
                  ${discountedPrice}
                </p>
              )}
              {/*If discount is there in the product then show original price here, otherwise show the price above*/}
              {discount && (
                <p className="text-[14px] font-inter font-light text-left">
                  ${price}
                </p>
              )}
            </div>
            <button className="bg-[#E2EAF8] mt-3 rounded-lg h-[36px] w-[135px] text-[14px]">
              Edit Product
            </button>
          </div>
          <button className="flex-shrink-0 flex items-center justify-center w-[36px] h-[36px] rounded-full self-start mt-4 mr-4 bg-[#F9F9F9]">
            <Heart className="w-[20px] h-[20px]" />
          </button>
        </div>
      </div>
    </Link>
  );
};
