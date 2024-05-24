import React, { useState } from "react";

const UploadImageInput = ({
  name,
  onChange,
  errors,
}: {
  name: string;
  onChange: (e: any) => void;
  errors: any;
}) => {
  const [image, setImage] = useState<any | null>(null);

  return (
    <div className="col-span-12 xl:col-span-4 2xl:col-span-3 ">
      <div className="bg-white px-8 py-8 rounded-md mb-6">
        <p className="mb-2 text-base text-black">Upload Image</p>
        <div className="text-center">
          <p>{image && `${image}`}</p>
          <span className="text-red-700">
            {errors.image && `${errors.image.message}`}
          </span>
        </div>
        <span className="text-tiny text-center w-full inline-block mb-3">
          Image size must be less than 5Mb
        </span>
        <div className="">
          <input
            type="file"
            id="productImage"
            className="hidden"
            value={image}
            name={name}
            onChange={(e) => {
              setImage(e.target.value);
              onChange(e.target.files);
            }}
          />
          <label
            htmlFor="productImage"
            className="text-tiny w-full inline-block py-1 px-4 rounded-md border border-gray6 text-center hover:cursor-pointer hover:bg-theme hover:text-white hover:border-theme transition"
          >
            Upload Image
          </label>
        </div>
      </div>
    </div>
  );
};

export default UploadImageInput;
