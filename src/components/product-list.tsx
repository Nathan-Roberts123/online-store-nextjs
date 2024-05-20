import Product from "./product";

const ProductList = () => {
  return (
    <div className="relative mx-8 mb-5 pt-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 ">
        <Product />
        <Product />
      </div>
    </div>
  );
};

export default ProductList;
