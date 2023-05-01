import React, { useState } from "react";
import { useTheme } from "next-themes";
import HeroBanner from "@/components/HeroBanner";
import ProductCard from "@/components/ProductCard";
import Wrapper from "@/components/Wrapper";
import { fetchDataFromApi } from "@/utils/api";
import useButtonClickedEvent from "@/hooks/useButtonClickedEvent";

const Home = ({ products }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const { theme } = useTheme();
  // Button click event hook
  const { handleClick, highlighted } = useButtonClickedEvent();

  return (
    <main>
      {/* It's slider - react responsive carousel */}
      <HeroBanner />

      {/* Live search input box - start */}
      <div className="flex items-center mb-8">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search products..."
          className="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      {/* Live search input box - end */}

      <Wrapper>
        {/* Home page title and paragraph start */}
        {/* <div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
          <div
            className={`${
              theme === "dark" ? "text-gray-200" : "text-gray-800"
            } text-[28px] md:text-[34px] mb-5 font-semibold leading-tight`}
          >
            Here You Can Buy All Kind of Shoes
          </div>
          <div
            className={`${
              theme === "dark" ? "text-gray-400" : "text-gray-500"
            } text-md md:text-xl`}
          >
            A lightweight Nike ZoomX midsole is combined with increased stack
            heights to help provide cushioning during extended stretches of
            running.
          </div>
        </div> */}
        {/* Home page title and paragraph end */}

        <div className="flex">
          {/* All products heading and button - start */}
          <h3
            className={`${
              theme === "dark" ? "text-gray-200" : "text-gray-800"
            } text-[20px] md:text-[24px] font-semibold leading-tight`}
          >
            All Products
          </h3>
          {/* Show more button */}
          <button
            onClick={() => handleClick("/products")}
            className={`ml-auto mb-0  text-orange-600 hover:text-orange-500 rounded-full px-2 py-1 ${
              highlighted ? "bg-gray-300" : ""
            }`}
          >
            Show More
          </button>
        </div>
        {/* All products heading and button - end */}

        {/* Show fetching products grid - start */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5 mb-14 px-5 md:px-0">
          {/* Live search condition also apply here */}
          {searchQuery
            ? products?.data
                ?.filter((product) =>
                  product.attributes.name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
                )
                .map((product) => {
                  return <ProductCard key={product?.id} data={product} />;
                })
            : products?.data?.slice(0, 6).map((product) => {
                return <ProductCard key={product?.id} data={product} />;
              })}
        </div>
        {/* Show fetching products grid - end */}
      </Wrapper>
    </main>
  );
};

export async function getStaticProps(context) {
  const products = await fetchDataFromApi("/api/products?populate=*");
  return {
    props: { products },
  };
}

export default Home;
