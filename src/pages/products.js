import React, { useState } from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import useSWR from "swr";
import ProductCard from "@/components/ProductCard";
import Wrapper from "@/components/Wrapper";
import { fetchDataFromApi } from "@/utils/api";

const maxResult = 6;

const ProductsPage = ({ products }) => {
  const { theme } = useTheme();
  const router = useRouter();
  // Pagination logic - start
  let [pageIndex, setPageIndex] = useState(1);

  const { data, isLoading } = useSWR(
    `/api/products?populate=*&pagination[page]=${pageIndex}&pagination[pageSize]=${maxResult}`,
    fetchDataFromApi,
    { fallbackData: products }
  );
  // Pagination logic - end

  return (
    <Wrapper>
      <div className="flex flex-wrap">
        <div className="w-1/3">Others</div>
        {/* Show fetching products grid - start */}
        <div className="w-2/3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 mt-5 mb-5 px-5 md:px-0">
          {data?.data?.map((product) => {
            return <ProductCard key={product?.id} data={product} />;
          })}
        </div>
        {/* Show fetching products grid - end */}

        {/* Pagination button - start */}
        {data?.meta?.pagination?.total > maxResult && (
          <div className="flex gap-3 items-center justify-center my-16 md:mb-8 md:mt-0 ml-auto">
            <button
              className={`${
                theme === "dark"
                  ? "bg-gray-200 disabled:bg-gray-500 text-gray-800 disabled:text-gray-300"
                  : "bg-gray-800 disabled:bg-gray-500 text-gray-200 disabled:text-gray-300"
              } rounded py-2 px-4 `}
              disabled={pageIndex === 1}
              onClick={() => setPageIndex(pageIndex - 1)}
            >
              Previous
            </button>

            <span
              className={`${
                theme === "dark" ? "text-gray-200" : "text-gray-800"
              } font-bold`}
            >{`${pageIndex} of ${
              data && data.meta.pagination.pageCount
            }`}</span>

            <button
              className={`${
                theme === "dark"
                  ? "bg-gray-200 disabled:bg-gray-500 text-gray-800 disabled:text-gray-300"
                  : "bg-gray-800 disabled:bg-gray-500 text-gray-200 disabled:text-gray-300"
              } rounded py-2 px-4`}
              disabled={pageIndex === (data && data.meta.pagination.pageCount)}
              onClick={() => setPageIndex(pageIndex + 1)}
            >
              Next
            </button>
          </div>
        )}
        {/* Pagination button - end */}
        {/* If loading, then this loading logo shows - start */}
        {isLoading && (
          <div className="absolute top-0 left-0 w-full h-full bg-white/[0.5] flex flex-col gap-5 justify-center items-center">
            <img src="/logo.svg" width={150} />
            <span className="text-2xl font-medium">Loading...</span>
          </div>
        )}
        {/* If loading, then this loading logo shows - start */}
      </div>
    </Wrapper>
  );
};

export default ProductsPage;

export async function getServerSideProps(context) {
  const products = await fetchDataFromApi(
    `/api/products?populate=*&pagination[page]=1&pagination[pageSize]=${maxResult}`
  );
  return {
    props: { products },
  };
}
