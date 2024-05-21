import ProductTable from "./components/product-table";
import TopBar from "../components/top-bar";

const ProductPage = () => {
  return (
    <>
      <TopBar title="Products" />
      <div className="bg-white rounded-t-md rounded-b-md shadow-xs py-4">
        <div className="flex justify-end mx-8 mb-6">
          <a href="product/new" className="tp-btn py-4">
            Add Product
          </a>
        </div>

        <div className="relative overflow-x-auto  mx-8">
          <ProductTable />
        </div>
      </div>
    </>
  );
};

export default ProductPage;
