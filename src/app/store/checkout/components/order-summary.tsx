import Product from "./product";
import { cartItem } from "@/types";

interface OrderSummaryProps {
  totalPrice: number;
  data: cartItem[];
}

const OrderSummary = ({ data, totalPrice }: OrderSummaryProps) => {
  return (
    <div className="px-4 pt-8">
      <p className="text-xl font-medium">Order Summary</p>
      <p className="text-gray-400">Check your items.</p>
      <div className="space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6 flex justify-between items-center">
        <span className="mt-0">Total:</span>${totalPrice}
      </div>
      <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
        {data.map((item) => {
          return <Product key={item.product.id} item={item} />;
        })}
      </div>
    </div>
  );
};

export default OrderSummary;
