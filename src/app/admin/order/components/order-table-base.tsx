"use client";
import OrderTable from "./order-table";
import { trpc } from "@/utils/trpc";

const OrderTableBase = () => {
  const { data, isFetching } = trpc.order.getOrders.useQuery();
  return (
    <table className="w-full 2xl:w-full text-base text-left text-gray-500">
      <thead className="bg-white">
        <tr className="border-b border-gray6 text-tiny">
          <th
            scope="col"
            className="pr-8 py-3 text-tiny text-text2 uppercase font-semibold w-20"
          >
            Order ID
          </th>
          <th
            scope="col"
            className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-6"
          >
            Customer Email
          </th>
          <th
            scope="col"
            className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-20 text-end"
          >
            QTY
          </th>
          <th
            scope="col"
            className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-20 text-end"
          >
            Total
          </th>
          <th
            scope="col"
            className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-20 text-end"
          >
            Date
          </th>
        </tr>
      </thead>
      <tbody>
        {isFetching || data == null ? (
          <div className="flex justify-center p-4">Loading...</div>
        ) : !data.length ? (
          <div className="flex justify-center p-4">Ther are no orders</div>
        ) : (
          data.map((order) => {
            return <OrderTable key={order.id} order={order} />;
          })
        )}
      </tbody>
    </table>
  );
};

export default OrderTableBase;
