"use client";

import OrdersIcon from "@/components/icons/orders";
import ProductIcon from "@/components/icons/product";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import HamburgMenu from "@/components/icons/hamburg-menu";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="tp-main-wrapper bg-slate-100 h-screen">
      <aside
        className={`w-[300px] lg:w-[250px] xl:w-[300px] border-r border-gray fixed left-0 top-0 h-full bg-white z-50 transition-transform duration-300 -translate-x-[300px] lg:translate-x-[0] ${
          sidebarOpen && "translate-x-[0px]"
        }`}
      >
        <div className="">
          <div className="px-8 py-[1.05rem] border-b border-gray flex items-center">
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
          </div>

          <div className="px-4 py-5" x-data="{nav:null}">
            <ul>
              <li>
                <a
                  href="/admin/product"
                  className="group rounded-md relative text-black text-lg font-medium inline-flex items-center w-full transition-colors ease-in-out duration-300 px-5 py-[9px] mb-2 hover:bg-gray sidebar-link-active"
                >
                  <span className="inline-block translate-y-[1px] mr-[10px] text-xl">
                    <ProductIcon />
                  </span>
                  Product
                </a>
              </li>

              <li>
                <a
                  href="/admin/order"
                  className="group rounded-md relative text-black text-lg font-medium inline-flex items-center w-full transition-colors ease-in-out duration-300 px-5 py-[9px] mb-2 hover:bg-gray sidebar-link-active"
                >
                  <span className="inline-block translate-y-[1px] mr-[10px] text-xl">
                    <OrdersIcon />
                  </span>
                  Orders
                </a>
              </li>
            </ul>
          </div>
        </div>
      </aside>
      <div
        onClick={() => {
          setSidebarOpen(false);
        }}
        className={`fixed top-0 left-0 w-full h-full z-40 bg-black/70 transition-all duration-300 ${
          sidebarOpen ? "visible opacity-1" : "invisible opacity-0"
        }`}
      >
        {" "}
      </div>
      <div
        className="tp-main-content lg:ml-[250px] xl:ml-[300px] w-[calc(100% - 300px)]"
        x-data="{ searchOverlay: false }"
      >
        <header className="relative z-[999] bg-white border-b border-gray border-solid py-[24px] px-8 pr-8 flex justify-between">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            type="button"
            className="block lg:hidden text-2xl text-black"
          >
            <HamburgMenu />
          </button>

          <span>Nsindiso</span>
        </header>

        <div className="body-content px-8 py-8 bg-slate-100">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
