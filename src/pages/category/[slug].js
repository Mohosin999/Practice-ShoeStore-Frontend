import React, { useEffect, useState } from "react";
// import { useRouter } from "next/router";
import Wrapper from "@/components/Wrapper";
import ProductCard from "@/components/ProductCard";

const Category = () => {
  //   const router = useRouter();

  return (
    <div className="w-full md:py-20 relative">
      <Wrapper>
        {/* category page title */}
        <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
          <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
            Running Shoes
          </div>
        </div>

        {/* products grid start */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
        {/* products grid end */}
      </Wrapper>
    </div>
  );
};

export default Category;
