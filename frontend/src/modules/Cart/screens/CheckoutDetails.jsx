import CheckoutInfo from "@/modules/Cart/components/checkoutDetails/CheckOutInfo.jsx";
import Products from "@/modules/Cart/components/checkoutDetails/Products.jsx";

const CheckoutDetails = () => {
  return (
    <div className="flex">
      <CheckoutInfo />
      <Products />
    </div>
  );
};

export default CheckoutDetails;
