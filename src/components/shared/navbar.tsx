import React from "react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/authOptions";

const Navbar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <header className="relative z-10 bg-white border-b border-gray border-solid py-5 px-8 pr-8">
      <div className="flex justify-between items-center">
        <h3>LOGO</h3>

        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1">
            <p className="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-3 text-xs text-white">
              3
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
          </button>
          <span>{session?.user?.name}</span>
          <Link href="#">Logout</Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;