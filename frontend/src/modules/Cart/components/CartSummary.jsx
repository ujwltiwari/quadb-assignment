import { Card, CardContent, CardHeader } from "@/components/ui/card.jsx";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cartSummary } from "@/constants/cart.js";
import { Separator } from "@/components/ui/separator.jsx";
import { Button } from "@/components/ui/button.jsx";
import { useNavigate } from "react-router-dom";

const CartSummary = ({ className, subTotal }) => {
  const navigate = useNavigate();
  return (
    <Card className={`!border-[#6C7275] ${className ?? ""}`}>
      <CardHeader className="text-[20px] font-medium text-left">
        Cart Summary
      </CardHeader>
      <CardContent>
        <RadioGroup defaultValue={cartSummary[0].title} className="gap-4">
          {cartSummary.map((x, idx) => (
            <div
              className="flex items-center space-x-2 border py-3 pl-4 rounded-sm border-gray-400"
              key={idx}
            >
              <RadioGroupItem value={x.title} id={x.title} />
              <div className="flex justify-between w-full px-4">
                <Label
                  className="font-regular text-[#141718]"
                  htmlFor={x.title}
                >
                  {x.title}
                </Label>
                <Label className="text-[#141718]" htmlFor={x.title}>
                  +${x.price}
                </Label>
              </div>
            </div>
          ))}
        </RadioGroup>
        <div className="flex justify-between py-4">
          <p>Subtotal</p>
          <p className="font-medium">${subTotal.toFixed(2)}</p>
        </div>
        <Separator />
        <div className="flex justify-between py-4 text-[20px]">
          <p className="font-semibold">Total</p>
          <p className="font-medium">${subTotal.toFixed(2)}</p>
        </div>
        <Button
          className="w-full h-[48px]"
          onClick={() => navigate("/cart/checkout")}
        >
          Checkout
        </Button>
      </CardContent>
    </Card>
  );
};

export default CartSummary;
