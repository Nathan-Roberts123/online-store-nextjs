import { TOrder } from "@/types";

interface OrderTableProps {
  order: TOrder;
}

const OrderTable = ({ order }: OrderTableProps) => {
  const date = order.createdAt!.split("T")[0];
  return (
    <tr className="bg-white border-b border-gray6 last:border-0 text-start mx-9">
      <td className="px-3 py-3 font-normal text-[#55585B]">{order.orderId}</td>
      <td className="pr-8 py-5 whitespace-nowrap">
        <span className="font-medium ">{order.customerEmail}</span>
      </td>

      <td className="px-3 py-3 font-normal text-[#55585B] text-end">
        {order.quantity}
      </td>
      <td className="px-3 py-3 font-normal text-[#55585B] text-end">
        ${order.totalPrice / 100}
      </td>

      <td className="px-3 py-3 font-normal text-[#55585B] text-end">{date}</td>
    </tr>
  );
};

export default OrderTable;
