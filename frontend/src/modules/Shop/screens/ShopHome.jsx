import ShopBanner from "@/modules/Shop/components/ShopBanner.jsx";
import Layout from "@/components/layout/Layout.jsx";
import Filter from "@/modules/Shop/components/filters/Filter.jsx";
import { categoriesFilters, priceFilters } from "@/constants/shopFilters.js";
import Products from "@/modules/Shop/components/Products.jsx";
import ContentWrapper from "@/components/ContentWrapper.jsx";
import Footer from "@/components/layout/Footer.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "@/components/Loader.jsx";

const ShopHome = () => {
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

  return (
    <>
      <ContentWrapper className="!max-w-[1280px] px-4">
        <Layout />
        <ShopBanner />
        {/*Filter Section*/}
        <div className="my-8 flex gap-8 items-center">
          <Filter title="Categories" items={categoriesFilters} />
          <Filter title="Price" items={priceFilters} selectLabel="All Price" />
        </div>
        {/*Filter Section*/}

        {loading ? (
          <div className="h-[400px] flex items-center justify-center">
            <Loader />
          </div>
        ) : (
          <>
            {/*Product Catalogue Section*/}
            <Products products={products} />
            {/*Product Catalogue Section*/}
          </>
        )}
      </ContentWrapper>
      <Footer />
    </>
  );
};

export default ShopHome;
