"use client";
import { trpc } from "@/utils/trpc";
import TableBottom from "./table-bottom";

const ProductTable = () => {
  const products = trpc.product.getProducts.useQuery();

  if (!products.data) {
    return <h2>Loading</h2>;
  }

  if (!products.data.length) {
    return <h2>No Products</h2>;
  }

  return (
    <table className="w-full text-base text-left text-gray-500">
      <thead className="bg-white">
        <tr className="border-b border-gray6 text-tiny">
          <th
            scope="col"
            className="pr-8 py-3 text-tiny text-text2 uppercase font-semibold"
          >
            Product
          </th>
          <th
            scope="col"
            className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[170px] text-end"
          >
            SKU
          </th>
          <th
            scope="col"
            className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[170px] text-end"
          >
            QTY
          </th>
          <th
            scope="col"
            className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[170px] text-end"
          >
            Price
          </th>
          <th
            scope="col"
            className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[170px] text-end"
          >
            Status
          </th>
          <th
            scope="col"
            className="px-9 py-3 text-tiny text-text2 uppercase  font-semibold w-[12%] text-end"
          >
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {products.data.map((product) => {
          return <TableBottom key={product.id} product={product} />;
        })}
      </tbody>
    </table>
  );
};

export default ProductTable;
