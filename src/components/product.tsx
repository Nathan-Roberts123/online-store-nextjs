import React from "react";
import Image from "next/image";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { trpc } from "@/utils/trpc";

interface ProductProps {
  id: string;
  imageUrl: string;
  name: string;
  price: number;
}

const Product = (props: ProductProps) => {
  const mutation = trpc.product.addToCart.useMutation();

  const handleAddToCart = () => {
    mutation.mutate({ productId: props.id });
  };

  return (
    <div className="rounded-md bg-white border-gray6 border">
      <div className="relative h-80">
        <a href="#">
          <Image
            className="w-full"
            objectFit="cover"
            layout="fill"
            src={props.imageUrl}
            alt=""
          />
        </a>
        <div className="absolute top-5 right-5 z-10">
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="relative">
              <button
                onClick={handleAddToCart}
                className="p-2 leading-10 text-tiny bg-success text-white rounded-md hover:bg-green-600 flex items-center justify-center"
              >
                <MdOutlineAddShoppingCart fontSize="20px" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="px-5 py-5">
        <a
          href="#"
          className="text-lg font-normal text-heading text-hover-primary mb-2 inline-block leading-none"
        >
          {props.name}
        </a>

        <div className="flex items-center space-x-1 text-tiny mb-5">
          <span className="text-yellow flex items-center space-x-1">
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
          </span>
        </div>
        <div className="leading-none mb-2">
          <span className="text-base font-medium text-black">
            ${props.price}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Product;
