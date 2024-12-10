import * as React from "react";
import Img from "@/components/Img.jsx";
import { useEffect, useState } from "react";
import axios from "axios";

const OrderConfirmation = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reRender, setReRender] = useState(false);
  const total = products.reduce((acc, cur) => acc + cur.price, 0);

  const orderDetails = [
    {
      label: "Order Code",
      value: "#0123_45678",
    },
    {
      label: "Date",
      value: "Dec 10, 2024",
    },
    {
      label: "Total",
      value: total,
    },
    {
      label: "Payment Method",
      value: "Credit Card",
    },
  ];

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
      // setTotal(
      //   temp.reduce((acc, cur) => {
      //     return Number(acc.price) + Number(cur.price);
      //   }, 0),
      // const price = temp.reduce((acc, cur) => acc + cur.price, 0);
    } catch (err) {
      console.error("error getting items from cart", err);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchCartItems();
  }, [reRender]);
  return (
    <div className="flex flex-col items-center px-24 py-20 bg-white rounded-lg shadow-2xl max-w-[738px] max-md:px-5">
      <div className="flex flex-col items-center w-full font-medium text-center">
        <div className="text-3xl tracking-tight leading-none text-zinc-500 max-md:max-w-full">
          Thank you! 🎉
        </div>
        <div className="mt-4 text-4xl tracking-tight leading-10 text-zinc-800 max-md:max-w-full">
          Your order has been received
        </div>
      </div>
      <div className="flex flex-wrap gap-10 justify-center items-start mt-10 w-full">
        {products.map((product, index) => (
          <div key={index} className="w-[80px] h-[96px] relative">
            <Img src={product.images?.[0]} className="w-[80px] h-[96px]" />
            <span className="h-[32px] w-[32px] bg-[#222] rounded-full absolute -top-[16px] -right-[16px] text-white flex items-center justify-center font-inter">
              {index + 1}
            </span>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center-center gap-5 mt-10 font-inter w-[60%]">
        {orderDetails.map((detail, index) => (
          <OrderDetail key={index} {...detail} />
        ))}
      </div>
      <button
        className="gap-2 self-stretch px-10 py-3 mt-10 text-base font-medium tracking-tight leading-7 text-center text-white bg-neutral-900 rounded-[80px] max-md:px-5"
        onClick={() => (window.location.href = "/profile")}
      >
        Purchase history
      </button>
    </div>
  );
};

export default OrderConfirmation;

const OrderDetail = ({ label, value }) => (
  <div className="flex gap-8 justify-start items-center w-full">
    <div className="w-1/2 text-left text-sm font-semibold leading-loose text-zinc-500">
      {label}:
    </div>
    <div className="text-sm font-semibold leading-loose text-neutral-900">
      {value}
    </div>
  </div>
);
