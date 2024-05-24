import React from "react";
import TopBar from "../../components/top-bar";
import NewProductForm from "./components/new-product-form";

const NewProuct = () => {
  return (
    <>
      <TopBar title="New Product" />
      <div className="grid grid-cols-12">
        <div className="col-span-12 2xl:col-span-10">
          <NewProductForm />
        </div>
      </div>
    </>
  );
};

export default NewProuct;
