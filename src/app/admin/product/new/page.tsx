import React from "react";
import TopBar from "../../components/top-bar";

type statusOption = {
  label: string;
  value: string;
};

const NewProuct = () => {
  const statusOptions: statusOption[] = [
    { label: "Active", value: "active" },
    { label: "In Active", value: "in-active" },
  ];
  return (
    <>
      <TopBar title="New Product" />
      <div className="grid grid-cols-12">
        <div className="col-span-12 2xl:col-span-10">
          <form>
            <div className="grid grid-cols-12 gap-6 mb-6">
              <div className="col-span-12 xl:col-span-8 2xl:col-span-9 ">
                <div className="mb-6 bg-white px-8 py-8 rounded-md">
                  <h4 className="text-[22px] mb-4">General</h4>

                  <div className="mb-5">
                    <p className="mb-0 text-base text-black">
                      Product Name <span className="text-red">*</span>
                    </p>
                    <input
                      className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
                      type="text"
                      placeholder="Product name"
                    />
                    <span className="text-tiny">
                      A product name is required and recommended to be unique.
                    </span>
                  </div>
                  <div className="mb-5">
                    <p className="mb-0 text-base text-black">Status</p>
                    <select className="input w-full rounded-md border border-gray6 px-6 text-base py-4">
                      {statusOptions.map((status) => {
                        return (
                          <option key={status.value} value={status.value}>
                            {status.label}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="mb-5">
                    <p className="mb-0 text-base text-black">
                      Product Price <span className="text-red">*</span>
                    </p>
                    <input
                      className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
                      type="number"
                      placeholder="Price"
                    />
                  </div>
                  <div className="mb-5">
                    <p className="mb-0 text-base text-black">
                      SUK <span className="text-red">*</span>
                    </p>
                    <input
                      className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
                      type="text"
                      placeholder="SKU"
                    />
                  </div>
                  <div className="mb-5">
                    <p className="mb-0 text-base text-black">
                      Quantity <span className="text-red">*</span>
                    </p>
                    <input
                      className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
                      type="number"
                      placeholder="Quantity"
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-12 xl:col-span-4 2xl:col-span-3 ">
                <div className="bg-white px-8 py-8 rounded-md mb-6">
                  <p className="mb-2 text-base text-black">Upload Image</p>
                  <div className="text-center">
                    <h1>Hello</h1>
                  </div>
                  <span className="text-tiny text-center w-full inline-block mb-3">
                    Image size must be less than 5Mb
                  </span>
                  <div className="">
                    <input type="file" id="productImage" className="hidden" />
                    <label
                      htmlFor="productImage"
                      className="text-tiny w-full inline-block py-1 px-4 rounded-md border border-gray6 text-center hover:cursor-pointer hover:bg-theme hover:text-white hover:border-theme transition"
                    >
                      Upload Image
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <button className="tp-btn px-10 py-4 mb-2" type="submit">
              Publish
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewProuct;
