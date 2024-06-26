import { TProduct } from "@/types";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import Input from "@/components/ui/input";
import UploadImageInput from "./upload-image-input";
import { Controller } from "react-hook-form";

interface ProductFormProps {
  onSubmit: (data: TProduct, event: any) => void;
  form: UseFormReturn<TProduct>;
  mutation: any;
}

type statusOption = {
  label: string;
  value: string;
};

const statusOptions: statusOption[] = [
  { label: "Active", value: "Active" },
  { label: "In Active", value: "InActive" },
];

const ProductForm = ({ onSubmit, form, mutation }: ProductFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = form;
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-12 gap-6 mb-6">
        <div className="col-span-12 xl:col-span-8 2xl:col-span-9 ">
          <div className="mb-6 bg-white px-8 py-8 rounded-md">
            <h4 className="text-[22px] mb-4">General</h4>

            <div className="mb-5">
              <p className="mb-0 text-base text-black">
                Product Name <span className="text-red">*</span>
              </p>
              <Input
                isInvalid={!!errors.name}
                type="text"
                placeholder="Product name"
                {...register("name")}
              />
              <span className="text-tiny">
                A product name is required and recommended to be unique.
              </span>
            </div>
            <div className="mb-5">
              <p className="mb-0 text-base text-black">Status</p>
              <select
                className="input w-full rounded-md border border-gray6 px-6 text-base py-4"
                {...register("status")}
              >
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
              <Input
                type="number"
                min="0"
                placeholder="Price"
                step="0.01"
                {...register("price")}
              />
            </div>
            <div className="mb-5">
              <p className="mb-0 text-base text-black">
                SUK <span className="text-red">*</span>
              </p>
              <Input
                isInvalid={!!errors.suk}
                type="text"
                placeholder="SKU"
                {...register("suk")}
              />
            </div>
            <div className="mb-5">
              <p className="mb-0 text-base text-black">
                Quantity <span className="text-red">*</span>
              </p>
              <Input
                type="number"
                placeholder="Quantity"
                min="0"
                {...register("quantity")}
              />
            </div>
          </div>
        </div>
        <Controller
          name="image"
          control={control}
          render={({ field: { value, name, onChange } }) => {
            return (
              <UploadImageInput
                name={name}
                onChange={onChange}
                errors={errors}
                value={value}
              />
            );
          }}
        />
      </div>

      <button
        className={`tp-btn px-10 py-4 mb-2 ${
          mutation.isPending && "hover:bg-blue-200 bg-blue-200"
        }`}
        type="submit"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? "Submitting" : "Submit"}
      </button>
    </form>
  );
};

export default ProductForm;
