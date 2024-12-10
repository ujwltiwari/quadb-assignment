import CartStepper from "@/modules/Cart/components/CartStepper.jsx";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "@/components/Loader.jsx";
import Layout from "@/components/layout/Layout.jsx";
import Footer from "@/components/layout/Footer.jsx";
import ContentWrapper from "@/components/ContentWrapper.jsx";
import CheckoutDetails from "@/modules/Cart/screens/CheckoutDetails.jsx";
import OrderConfirmationPage from "@/modules/Cart/screens/OrderConfirmationPage.jsx";
import OrderConfirmation from "@/modules/Cart/components/orderConfirmation/OrderConfirmation.jsx";

const Cart = () => {
  const { cart } = useSelector((state) => state.cart);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchCartItems = async () => {
    const result = await axios.get("http://localhost:3000/products/all", {
      params: {
        productIds: cart,
      },
    });
    setLoading(false);
    setProducts(result.data);
    console.log(result);
  };

  useEffect(() => {
    fetchCartItems();
  }, []);
  return (
    <>
      <ContentWrapper className="!max-w-[1280px] px-4">
        <Layout />
        <h1 className="font-normal text-[54px]">Complete!</h1>
        <CartStepper />
        {loading ? (
          <div className="h-[400px] flex items-center justify-center">
            <Loader />
          </div>
        ) : (
          <div className="flex w-full justify-center py-24">
            <OrderConfirmation />
          </div>
        )}
      </ContentWrapper>
      <Footer />
    </>
  );
};

export default Cart;
