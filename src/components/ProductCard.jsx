import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getDiscountedPricePercentage } from "@/utils/helper";

const ProductCard = ({ data }) => {
  return (
    <Link
      className="transform overflow-hidden bg-white duration-200 hover:scale-105 cursor-pointer"
      href={`/product/${data.attributes.slug}`}
    >
      <Image
        width={500}
        height={500}
        src={data.attributes.thumbnail.data.attributes.url}
        alt={data.attributes.name}
      />
      <div className="p-4 text-black/[0.9]">
        <h2 className="text-lg font-medium">{data.attributes.name}</h2>
        <div className="flex items-center text-black/[0.5]">
          <p className="mr-2 text-lg font-semibold">
            &#2547;{data.attributes.price}
          </p>

          {/* if original price exist, then this following code will rendered */}
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
      </div>
    </Link>
  );
};

export default ProductCard;
