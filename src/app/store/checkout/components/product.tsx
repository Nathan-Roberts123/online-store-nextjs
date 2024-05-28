import { TProduct, cartItem } from "@/types";
import Image from "next/image";
import React from "react";

const Product = ({ item }: { item: cartItem }) => {
  return (
    <div className="flex flex-col rounded-lg bg-white sm:flex-row">
      <Image
        className="m-2 h-24 w-28 rounded-md border object-cover object-center"
        src={item.product.image}
        width={28}
        height={24}
        alt=""
      />
      <div className="flex w-full flex-col px-4 py-4">
        <span className="font-semibold">{item.product.name}</span>
        <span className="float-right text-gray-400">
          Quantity: {item.quantity}
        </span>
        <p className="text-lg font-bold">${item.product.price}</p>
      </div>
    </div>
  );
};

export default Product;
