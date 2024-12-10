import ImageGrid from "@/modules/Product/components/ProductDetails/ImageGrid.jsx";
import Content from "@/modules/Product/components/ProductDetails/Content.jsx";
import Layout from "@/components/layout/Layout.jsx";
import { BreadCrumbComp } from "@/modules/Product/components/ProductDetails/BreadCrumb.jsx";
import { GoArrowRight } from "react-icons/go";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel.jsx";
import SingleProductCard from "@/modules/Product/components/ProductCard/SingleProductCard.jsx";
import NewsletterSignup from "@/components/NewsLetterSignUp.jsx";
import ContentWrapper from "@/components/ContentWrapper.jsx";
import Footer from "@/components/layout/Footer.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const ProductDetails = () => {
  const pathname = useLocation().pathname.split("/");
  const productId = pathname[pathname.length - 1];
  const [product, setProduct] = useState([]);
  const [products, setProducts] = useState([]);

  const getProductDetail = async () => {
    const result = await axios.get(
      `http://localhost:3000/products/${productId}`,
    );
    setProduct(result.data);
  };

  const getAllProducts = async () => {
    const result = await axios.get("http://localhost:3000/products");
    setProducts(result.data);
  };

  useEffect(() => {
    getProductDetail();
  }, []);

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      <ContentWrapper className="!max-w-[1200px] px-4">
        <Layout className="font-inter">
          <BreadCrumbComp currentRoute="Living Room" />
          <div className="flex gap-8">
            <ImageGrid
              images={Array.from({ length: 4 }).map((x) => product?.images)}
            />
            <Content product={product} />
          </div>
          <div className="flex justify-between my-8 font-poppins">
            <h2 className="text-[28px] font-semibold">You Might Also Like</h2>
            <a
              className="flex gap-2 items-center font-medium border-b border-[#222]"
              href="/shop"
            >
              More Products
              <GoArrowRight />
            </a>
          </div>
          <div className="flex">
            <Carousel>
              <CarouselContent>
                {products?.map((product, idx) => {
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
                    <CarouselItem key={idx} className="basis-1/5">
                      <SingleProductCard
                        url={`/admin/product/${_id}`}
                        images={images}
                        title={title}
                        price={price}
                        isNew={false}
                        discount={discount}
                        rating={rating}
                        key={product.id}
                        className="h-full"
                      />
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </Layout>
      </ContentWrapper>
      <NewsletterSignup className="mt-12 m-auto" />
      <Footer />
    </>
  );
};

export default ProductDetails;
