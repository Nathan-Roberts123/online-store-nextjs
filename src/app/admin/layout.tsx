import OrdersIcon from "@/components/icons/orders";
import ProductIcon from "@/components/icons/product";
import React from "react";
import TopBar from "./components/top-bar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="tp-main-wrapper bg-slate-100 h-screen">
      <aside className="w-[300px] lg:w-[250px] xl:w-[300px] border-r border-gray fixed left-0 top-0 h-full bg-white z-50 transition-transform duration-300 -translate-x-[300px] lg:translate-x-[0]">
        <div className="">
          <div className="px-8 py-5 border-b border-gray flex items-center">
            <a href="index.html">
              <span>Logo</span>
            </a>
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
        className="tp-main-content lg:ml-[250px] xl:ml-[300px] w-[calc(100% - 300px)]"
        x-data="{ searchOverlay: false }"
      >
        <header className="relative z-[999] bg-white border-b border-gray border-solid py-5 px-8 pr-8">
          <span>Nsindiso</span>
        </header>

        <div className="body-content px-8 py-8 bg-slate-100">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
