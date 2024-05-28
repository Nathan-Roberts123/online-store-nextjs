"use client";

import Product from "./product";
import { trpc } from "@/utils/trpc";
import { CircularProgress } from "@mui/material";

const ProductList = () => {
  const { isLoading, data } = trpc.product.getProducts.useQuery();

  if (isLoading) {
    return (
      <div className="flex h-full justify-center items-center">
        <CircularProgress />
      </div>
    );
  }

  if (data && !data.length) {
    return (
      <div className="flex h-full justify-center items-center">
        No Products Are Available
      </div>
    );
  }

  return (
    <div className="relative mx-8 mb-5 pt-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 ">
        {data &&
          data.map((product) => {
            if (product.status === "Active") {
              return <Product key={product.id} product={product} />;
            }
          })}
      </div>
    </div>
  );
};

export default ProductList;
