import { useSelector } from "react-redux";
import Img from "@/components/Img.jsx";
import { Button } from "@/components/ui/button.jsx";
import { FiMinus } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "@/components/Loader.jsx";
import { Input } from "@/components/ui/input.jsx";
import Coupon from "@/assets/icons/Coupon.jsx";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reRender, setReRender] = useState(false);
  const total = products.reduce((acc, cur) => acc + cur.price, 0);
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
    <div className="w-[40%] border border-[#6C7275] rounded-sm p-[24px] mt-[16px] font-inter h-fit">
      <h2 className="text-[28px] mb-8">Order summary</h2>
      {loading ? (
        <div className="h-[400px] flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {products.map((product) => (
            <SingleProduct product={product} key={product._id} />
          ))}
          <div className="flex gap-2 items-center">
            <Input placeholder="Input" className="h-[46px]" />
            <Button className="h-[46px]">Apply</Button>
          </div>
          <div className="border-b border-gray-200" />
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              <Coupon width={20} height={20} />
              <p className="text-[16px]">JenkateMW</p>
            </div>
            <p className="text-[#38CB89] font-medium">-$25.00 [Remove]</p>
          </div>
          <div className="border-b border-gray-200" />
          <div className="flex items-center justify-between text-[16px]">
            <p className="text-[#141718]">Shipping</p>
            <p className="text-[#141718] font-medium">Free</p>
          </div>
          <div className="border-b border-gray-200" />
          <div className="flex items-center justify-between text-[16px]">
            <p className="text-[#141718]">Subtotal</p>
            <p className="text-[#141718] font-medium">${total}</p>
          </div>
          <div className="border-b border-gray-200" />
          <div className="flex items-center justify-between text-[20px]">
            <p className="text-[#141718]">Total</p>
            <p className="text-[#141718] font-medium">${total}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;

const SingleProduct = ({ product }) => {
  console.log("singleProduct", product);
  return (
    <div className="flex justify-between pb-6 border-b border-gray-200">
      <div className="flex gap-2">
        <Img src={product.images?.[0]} className="h-[90px] w-[80px]" />
        <div className="flex flex-col gap-2 justify-start">
          <p className="text-[14px] text-[#141718] font-medium text-left">
            {product.title}
          </p>
          <p className="text-[#6C7275] text-[12px] text-left">
            Color: {product?.colors?.[0] || "No Color"}
          </p>
          <QuantitySelector selectedQuantity={1} />
        </div>
      </div>
      <p className="text-[#141718] font-medium">
        ${Number(product.price).toFixed(2)}
      </p>
    </div>
  );
};

const QuantitySelector = ({ selectedQuantity, onChange }) => (
  <div className="w-fit flex items-center justify-between rounded-lg border border-[#6C7275]">
    <Button variant="ghost" size="icon" onClick={() => onChange("subtract")}>
      <FiMinus size={14} />
    </Button>
    <div className="text-[12px]">{selectedQuantity}</div>
    <Button variant="ghost" size="icon" onClick={() => onChange("add")}>
      <GoPlus size={14} />
    </Button>
  </div>
);
