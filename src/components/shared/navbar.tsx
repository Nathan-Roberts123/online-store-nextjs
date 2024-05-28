"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useContext } from "react";
import { TotalItemsContext } from "@/providers/total-items-provider";
import Image from "next/image";

const Navbar = () => {
  const { data: session } = useSession();
  const totalValue = useContext(TotalItemsContext);

  return (
    <header className="relative z-10 bg-white border-b border-gray border-solid py-5 px-8 pr-8">
      <div className="flex justify-between items-center">
        <Link href="/store">
          <div className="flex gap-2 items-center">
            <Image src="/Blue/1.svg" width={40} height={40} alt="Logo" />
            <Image
              className="hidden md:block"
              src="/shop.png"
              width={200}
              height={10}
              alt="Logo"
            />
          </div>
        </Link>

        <div className="flex items-center gap-8">
          <Link href="/store/cart" className="flex items-center gap-1">
            <p className="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-3 text-xs text-white">
              {totalValue}
            </p>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="file: h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
          </Link>
          <span>{session?.user?.name}</span>
          <button
            className="border-none bg-none hover:bg-slate-200 hover:text-white px-4 py-2 rounded-md"
            onClick={() =>
              signOut({
                callbackUrl: `${window.location.origin}/auth/signin`,
              })
            }
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
