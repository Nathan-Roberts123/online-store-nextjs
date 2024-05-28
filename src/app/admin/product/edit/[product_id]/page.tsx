import React from "react";
import TopBar from "@/app/admin/components/top-bar";
import EditProuctForm from "./components/edit-product-form";

const EditProduct = () => {
  return (
    <>
      <TopBar title="Edit Product" />
      <div className="grid grid-cols-12">
        <div className="col-span-12 2xl:col-span-10">
          <EditProuctForm />
        </div>
      </div>
    </>
  );
};

export default EditProduct;
