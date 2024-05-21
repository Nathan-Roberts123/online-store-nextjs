import React from "react";
import image from "../../assets/img/product/prodcut-3.jpg";
import Image from "next/image";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { GoPencil } from "react-icons/go";

interface ProductProps {
  type?: "admin" | "store";
}

const Product = (props: ProductProps) => {
  const { type } = props;

  return (
    <div className="rounded-md bg-white border-gray6 border">
      <div className="relative">
        <a href="#">
          <Image
            className="w-full"
            width={350}
            height={500}
            src={image}
            alt=""
          />
        </a>
        <div className="absolute top-5 right-5 z-10">
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="relative">
              <button className="p-2 leading-10 text-tiny bg-success text-white rounded-md hover:bg-green-600 flex items-center justify-center">
                {type === "store" || !type ? (
                  <MdOutlineAddShoppingCart fontSize="20px" />
                ) : (
                  <GoPencil fontSize="20px" />
                )}
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
          Women&apos;s Essentials Shoes
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
          <span className="text-base font-medium text-black">$350.00</span>
        </div>
      </div>
    </div>
  );
};

export default Product;
