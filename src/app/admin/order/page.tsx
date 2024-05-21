import React from "react";
import TopBar from "../components/top-bar";
import Image from "next/image";

const Orders = () => {
  return (
    <>
      <TopBar title="Orders" />
      <div className="bg-white rounded-t-md rounded-b-md shadow-xs py-4">
        <div className="relative overflow-x-auto  mx-8">
          <table className="w-full 2xl:w-full text-base text-left text-gray-500">
            <thead className="bg-white">
              <tr className="border-b border-gray6 text-tiny">
                <th
                  scope="col"
                  className="pr-8 py-3 text-tiny text-text2 uppercase font-semibold w-20"
                >
                  Order ID
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-6"
                >
                  Customer
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-20 text-end"
                >
                  QTY
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-20 text-end"
                >
                  Total
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-20 text-end"
                >
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b border-gray6 last:border-0 text-start mx-9">
                <td className="px-3 py-3 font-normal text-[#55585B]">
                  #479063DR
                </td>
                <td className="pr-8 py-5 whitespace-nowrap">
                  <a
                    href="#"
                    className="flex items-center space-x-5 text-hover-primary text-heading"
                  >
                    <Image
                      className="w-[50px] h-[50px] rounded-full"
                      width={50}
                      height={50}
                      src="assets/img/users/user-10.jpg"
                      alt=""
                    />
                    <span className="font-medium ">William Watson</span>
                  </a>
                </td>

                <td className="px-3 py-3 font-normal text-[#55585B] text-end">
                  2
                </td>
                <td className="px-3 py-3 font-normal text-[#55585B] text-end">
                  $171.00
                </td>

                <td className="px-3 py-3 font-normal text-[#55585B] text-end">
                  16 Jan, 2023
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Orders;
