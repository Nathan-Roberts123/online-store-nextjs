"use client";
import React from "react";
import TotalSection from "./components/total-section";
import Link from "next/link";
import CartProduct from "./components/cart-product";
import { useContext } from "react";
import { CartContext } from "@/providers/cart-provider";
import { useSession } from "next-auth/react";

const Cart = () => {
  const data = useContext(CartContext);
  let totalPrice = 0;

  data.length &&
    data.forEach((item) => {
      const prdPrice = item.product.price * item.quantity;
      totalPrice += prdPrice;
    });

  return (
    <section className="py-4 relative">
      <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
        <div className="hidden lg:grid grid-cols-2 py-6">
          <div className="font-normal text-xl leading-8 text-gray-500">
            Product
          </div>
          <p className="font-normal text-xl leading-8 text-gray-500 flex items-center justify-between">
            <span className="w-full max-w-[260px] text-center">Quantity</span>
            <span className="w-full max-w-[200px] text-center">Total</span>
          </p>
        </div>

        {data ? (
          data.map((item) => {
            return (
              <CartProduct
                key={item.product.id}
                product={item.product}
                quantity={item.quantity}
              />
            );
          })
        ) : (
          <h1 className="flex justify-center p-4">Empty Cart</h1>
        )}
        <TotalSection totalPrice={totalPrice} />

        <div className="flex items-center flex-col sm:flex-row justify-center gap-3 mt-8">
          <Link
            href="/store"
            className="rounded-full py-4 w-full max-w-[280px]  flex items-center bg-indigo-50 justify-center transition-all duration-500 hover:bg-indigo-100"
          >
            <span className="px-2 font-semibold text-lg leading-8 text-indigo-600">
              Continue Shopping
            </span>
          </Link>
          <Link
            href="/store/checkout"
            className="rounded-full w-full max-w-[280px] py-4 text-center justify-center items-center bg-indigo-600 font-semibold text-lg text-white flex transition-all duration-500 hover:bg-indigo-700"
          >
            Continue to Payment
            <svg
              className="ml-2"
              xmlns="http://www.w3.org/2000/svg"
              width="23"
              height="22"
              viewBox="0 0 23 22"
              fill="none"
            >
              <path
                d="M8.75324 5.49609L14.2535 10.9963L8.75 16.4998"
                stroke="white"
                stroke-width="1.6"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Cart;
