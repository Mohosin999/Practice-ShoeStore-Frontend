import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

const CartItem = () => {
  return (
    <div className="flex py-5 gap-3 md:gap-5 border-b">
      {/* image start */}
      <div className="shrink-0 aspect-square w-[50px] md:w-[120px]">
        <img src="/product-1.webp" alt="Product Image" />
      </div>
      {/* image end */}

      <div className="w-full flex flex-col">
        <div className="flex flex-col md:flex-row justify-between">
          {/* product title */}
          <div className="text-lg md:text-2xl font-semibold text-black/[0.8]">
            Product Title
          </div>

          {/* product subtitle */}
          <div className="text-sm md:text-md font-medium text-black/[0.5] block md:hidden">
            Product Subtitle
          </div>

          {/* product price */}
          <div className="text-sm md:text-md font-bold text-black/[0.5] mt-2">
            MRP : $20.00
          </div>
        </div>

        {/* product subtitle */}
        <div className="text-md font-medium text-black/[0.5] hidden md:block">
          Product Subtitle
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2 md:gap-10 text-black/[0.5] text-sm md:text-md">
            {/* select size start */}
            <div className="flex items-center gap-1">
              <div className="font-semibold">Size:</div>
              <select className="hover:text-black">
                <option value="1">UK 2</option>
                <option value="2">UK 3</option>
                <option value="3">UK 4</option>
                <option value="4">UK 5</option>
                <option value="5">UK 6</option>
              </select>
            </div>
            {/* select size end */}

            {/* select quantity start */}
            <div className="flex items-center gap-1">
              <div className="font-semibold">Quantity:</div>
              <select className="hover:text-black">
                <option value="1">1</option>
                <option value="1">2</option>
                <option value="2">3</option>
                <option value="3">4</option>
                <option value="4">5</option>
                <option value="5">6</option>
              </select>
            </div>
            {/* select quantity end */}
          </div>

          {/* delete icon */}
          <div>
            <RiDeleteBin6Line className="cursor-pointer text-black/[0.5] hover:text-black text-[16px] md:text-[20px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
