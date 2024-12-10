import React, { useCallback, useState } from "react";
import { Button } from "@/components/ui/button.jsx";
import { FiMinus } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CartSummary from "@/modules/Cart/components/CartSummary.jsx";
import { Input } from "@/components/ui/input.jsx";
import Coupon from "@/assets/icons/Coupon.jsx";
import { removeFromCart } from "@/redux/cart/slice.js";
import { useDispatch } from "react-redux";
import axios from "axios";
const ProductList = ({ products, setReRender, reRender, setProducts }) => {
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const cartTotal = products.reduce((acc, cur) => {
    return (acc += cur.price);
  }, 0);
  console.log("products", products);

  const handleQuantityChange = useCallback((type) => {
    setSelectedQuantity((quantity) => {
      if (type === "add") {
        return quantity + 1;
      }
      if (type === "subtract" && quantity > 1) {
        return quantity - 1;
      }
      return quantity;
    });
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex gap-12 justify-start">
        <div className="!w-fit pr-8 !max-w-[60%]">
          <Table className="">
            <TableHeader>
              <TableRow className="font-semibold">
                <TableHead className="w-[100px] font-semibold text-black text-[16px]">
                  Product
                </TableHead>
                <TableHead className="font-semibold text-black text-[16px]">
                  Quantity
                </TableHead>
                <TableHead className="font-semibold text-black text-[16px]">
                  Price
                </TableHead>
                <TableHead className="text-right font-semibold text-black text-[16px]">
                  Subtotal
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => {
                return (
                  <TableRow key={product._id}>
                    <TableCell>
                      <ProductItem
                        {...product}
                        setReRender={setReRender}
                        reRender={reRender}
                        setProducts={setProducts}
                      />
                    </TableCell>
                    <TableCell>
                      <QuantitySelector selectedQuantity={selectedQuantity} />
                    </TableCell>
                    <TableCell className="text-[20px]">
                      ${product.price}
                    </TableCell>
                    <TableCell className="text-[20px] font-semibold">
                      ${product.price * selectedQuantity}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        <CartSummary
          className="w-[40%] max-w-[400px] h-fit rounded-sm"
          subTotal={cartTotal}
        />
      </div>
      <div className="self-start flex flex-col gap-2">
        <h4 className="font-medium text-[20px] self-start">Have a coupon?</h4>
        <h6 className="text-[#6C7275] text-[16px]">
          Add your code for an instant cart discount
        </h6>
        <div className="border border-[#6C7275] flex items-center px-4 h-[48px] rounded-sm mb-24">
          <Coupon width={30} height={30} />
          <Input
            placeholder="Coupon Code"
            className="!border-none !focus:outline-none !focus:border-none"
          />
          <button className="text-[14px] font-medium">Apply</button>
        </div>
      </div>
    </div>
  );
};

export default ProductList;

const ProductItem = ({
  title,
  colors,
  selectedQuantity,
  price,
  images,
  _id,
  cartItemId,
  setReRender,
  reRender,
  setProducts,
}) => {
  const dispatch = useDispatch();
  const subtotal = price * selectedQuantity;
  const handleItemRemove = async () => {
    console.log("handleItemRemove");
    try {
      const res = await axios.delete(
        `http://localhost:3000/cart/${cartItemId}`,
      );
      console.log("deleted", res);
      dispatch(removeFromCart(_id));
      // setTimeout(() => {
      //   setReRender(!reRender);
      // }, 500);
      setProducts((prev) => prev.filter((p) => p._id !== _id));
    } catch (err) {
      console.error("Error removing from cart", err);
    }
  };

  return (
    <article className="flex flex-wrap justify-between items-center py-6 max-md:max-w-full">
      <div className="flex flex-col self-stretch my-auto text-sm leading-loose min-w-[240px] text-zinc-500 w-[316px]">
        <div className="flex gap-4 items-center w-full max-w-[316px]">
          <img
            loading="lazy"
            src={images[0]}
            alt={`${title} in ${colors}`}
            className="object-cover object-center h-[100px] w-[80px] shrink-0 self-stretch my-auto aspect-[0.83]"
          />
          <div className="flex flex-1 shrink gap-4 items-start self-stretch my-auto basis-0">
            <div className="flex flex-col justify-center items-start w-[210px]">
              <div className="text-neutral-900">{title}</div>
              <div className="mt-2 float-left text-xs font-normal leading-loose">
                Color: {colors}
              </div>
              <button className="flex gap-1 items-center self-start mt-2 whitespace-nowrap border-0 border-solid border-zinc-600">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/c729af904b1aae9c8dfcf5f1460c66ea5f665667eba74946a6b8dfc089a978cb?placeholderIfAbsent=true&apiKey=69881ca4efe24956bf287a23a24c936c"
                  alt=""
                  className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
                />
                <span
                  className="self-stretch my-auto font-semibold"
                  onClick={handleItemRemove}
                >
                  Remove
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

const QuantitySelector = ({ selectedQuantity, onChange }) => (
  <div className="flex items-center justify-between px-2 py-1 rounded-lg bg-neutral-100 min-h-[32px]">
    <Button variant="ghost" size="icon" onClick={() => onChange("subtract")}>
      <FiMinus size={20} />
    </Button>
    <div>{selectedQuantity}</div>
    <Button variant="ghost" size="icon" onClick={() => onChange("add")}>
      <GoPlus size={20} />
    </Button>
  </div>
);
