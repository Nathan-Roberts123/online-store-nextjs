import React from "react";
import TopBar from "../components/top-bar";
import dynamic from "next/dynamic";

const NoSSR = dynamic(() => import("./components/order-table-base"), {
  ssr: false,
});

const Orders = () => {
  return (
    <>
      <TopBar title="Orders" />
      <div className="bg-white rounded-t-md rounded-b-md shadow-xs py-4">
        <div className="relative overflow-x-auto  mx-8">
          <NoSSR />
        </div>
      </div>
    </>
  );
};

export default Orders;
