import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { getDiscountedPricePercentage } from "@/utils/helper";

const ProductCard = ({ data }) => {
  const { theme } = useTheme();

  return (
    <Link
      className={`${
        theme === "dark"
          ? "bg-gray-800 text-gray-200"
          : "bg-gray-200 text-gray-800"
      } transform overflow-hidden duration-200 hover:scale-105 cursor-pointer`}
      href={`/product/${data.attributes.slug}`}
    >
      {/* Product image */}
      <Image
        width={500}
        height={500}
        src={data.attributes.thumbnail.data.attributes.url}
        alt={data.attributes.name}
      />
      {/* Product details section */}
      <div className="p-4">
        {/* Product name */}
        <h2 className="text-lg font-medium">{data.attributes.name}</h2>
        {/* Product price and discount - start */}
        <div
          className={`flex items-center ${
            theme === "dark" ? "text-gray-400" : "text-gray-500"
          }`}
        >
          <p className="mr-2 text-lg font-semibold">
            &#2547;{data.attributes.price}
          </p>

          {/* If original price exist, then this following code will rendered */}
          {data.attributes.original_price && (
            <>
              <p className="text-base  font-medium line-through">
                &#2547;{data.attributes.original_price}
              </p>
              <p className="ml-auto text-base font-medium text-green-500">
                {getDiscountedPricePercentage(
                  data.attributes.original_price,
                  data.attributes.price
                )}
                % off
              </p>
            </>
          )}
        </div>
        {/* Product price and discount - end */}
      </div>
    </Link>
  );
};

export default ProductCard;
