import CartStepper from "@/modules/Cart/components/CartStepper.jsx";
import ProductList from "@/modules/Cart/components/CartItems.jsx";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "@/components/Loader.jsx";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reRender, setReRender] = useState(false);

  const fetchCartItems = async () => {
    console.log("fetch CartItems");
    try {
      const { data: cartItems } = await axios.get("http://localhost:3000/cart");
      setProducts(cartItems);
      console.log("cartItems", cartItems);
      // fetch all the products based on cartItems
      const temp = [];
      let idx = 0;
      for (const item of cartItems) {
        const { data: productsData } = await axios.get(
          `http://localhost:3000/products/${item.productId}`,
        );
        temp.push({ ...productsData, cartItemId: cartItems[idx]._id });
        idx++;
      }
      console.log("cart", temp);

      setProducts(temp);
    } catch (err) {
      console.error("error getting items from cart", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCartItems();
  }, [reRender]);

  return (
    <div className="font-inter">
      <h1 className="font-inter font-normal text-[54px]">Cart</h1>
      <CartStepper />
      {loading ? (
        <div className="h-[400px] flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <ProductList
          products={products}
          setReRender={setReRender}
          reRender={reRender}
          setProducts={setProducts}
        />
      )}
    </div>
  );
};

export default Cart;
