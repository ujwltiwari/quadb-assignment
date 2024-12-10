import Layout from "@/components/layout/Layout.jsx";
import ContentWrapper from "@/components/ContentWrapper.jsx";
import Footer from "@/components/layout/Footer.jsx";
import Cart from "@/modules/Cart/components/Cart.jsx";

const CartPage = () => {
  return (
    <>
      <ContentWrapper className="!max-w-[1280px] px-4">
        <Layout />
        <Cart />
      </ContentWrapper>
      <Footer />
    </>
  );
};

export default CartPage;
