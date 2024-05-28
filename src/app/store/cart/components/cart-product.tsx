import MinusIcon from "@/components/icons/minus-icon";
import PlusIcon from "@/components/icons/plus-icon";
import { CartDispatchContext } from "@/providers/cart-provider";
import { TotalItemsDispatchContext } from "@/providers/total-items-provider";
import { TProduct } from "@/types";
import { trpc } from "@/utils/trpc";
import Image from "next/image";
import { useContext } from "react";

const CartProduct = ({
  product,
  quantity,
}: {
  product: TProduct;
  quantity: number;
}) => {
  const cartDispatch = useContext(CartDispatchContext);
  const totalItemsDispatch = useContext(TotalItemsDispatchContext);

  const mutation = trpc.cart.addToCart.useMutation({
    onSuccess: (data) => {
      cartDispatch({ type: "addProduct", value: data });
    },
  });
  const removeMutation = trpc.cart.removeProduct.useMutation({
    onSuccess: (data) => {
      if (data) {
        cartDispatch({ type: "removeProduct", value: data });
      }
    },
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-[550px]:gap-6 border-t border-gray-200 py-6">
      <div className="flex items-center flex-col min-[550px]:flex-row gap-3 min-[550px]:gap-6 w-full max-xl:justify-center max-xl:max-w-xl max-xl:mx-auto">
        <div className="img-box">
          <Image
            src={product.image}
            alt="perfume bottle image"
            width={40}
            height={40}
            className="xl:w-[140px]"
          />
        </div>
        <div className="pro-data w-full max-w-sm ">
          <h5 className="font-semibold text-xl leading-8 text-black max-[550px]:text-center">
            {product.name}
          </h5>
          <h6 className="font-medium text-lg leading-8 text-indigo-600  max-[550px]:text-center">
            ${product.price}
          </h6>
        </div>
      </div>
      <div className="flex items-center flex-col min-[550px]:flex-row w-full max-xl:max-w-xl max-xl:mx-auto gap-2">
        <div className="flex items-center w-full mx-auto justify-center">
          <button
            onClick={() => {
              removeMutation.mutate({ productId: product.id });
              totalItemsDispatch({ type: "decrementCart", value: 1 });
            }}
            className="group rounded-l-full px-6 py-[16px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-300 hover:bg-gray-50"
          >
            <MinusIcon />
          </button>
          <input
            type="text"
            className="border-y border-gray-200 outline-none text-gray-900 font-semibold text-lg w-full max-w-[118px] min-w-[80px] placeholder:text-gray-900 py-[15px] text-center bg-transparent"
            placeholder={`${quantity}`}
          />
          <button
            onClick={() => {
              mutation.mutate({ productId: product.id });
              totalItemsDispatch({ type: "incrementCart", value: 1 });
            }}
            className="group rounded-r-full px-6 py-[16px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-300 hover:bg-gray-50"
          >
            <PlusIcon />
          </button>
        </div>
        <h6 className="text-indigo-600 font-manrope font-bold text-2xl leading-9 w-full max-w-[176px] text-center">
          ${product.price * quantity}
        </h6>
      </div>
    </div>
  );
};

export default CartProduct;
