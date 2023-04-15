import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import useSWR from "swr";

import Wrapper from "@/components/Wrapper";
import ProductCard from "@/components/ProductCard";
import { fetchDataFromApi } from "@/utils/api";

const maxResult = 3;

const Category = ({ category, products, slug }) => {
  // pagination and it's next page data fetch start
  const [pageIndex, setPageIndex] = useState(1);
  const { query } = useRouter();
  const { theme } = useTheme();

  useEffect(() => {
    setPageIndex(1);
  }, [query]);

  const { data, error, isLoading } = useSWR(
    `/api/products?populate=*&[filters][categories][slug][$eq]=${slug}&pagination[page]=${pageIndex}&pagination[pageSize]=${maxResult}`,
    fetchDataFromApi,
    { fallbackData: products }
  );
  // pagination and it's next page data fetch end

  return (
    <div
      className={`${
        theme === "dark" ? "text-gray-300" : "text-gray-700"
      } w-full md:py-20 relative`}
    >
      <Wrapper>
        {/* category page title */}
        <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
          <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
            {category?.data?.[0]?.attributes?.name}
          </div>
        </div>

        {/* products grid start */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
          {data?.data?.map((product) => {
            return <ProductCard key={product?.id} data={product} />;
          })}
        </div>
        {/* products grid end */}

        {/* pagination button start */}
        {data?.meta?.pagination?.total > maxResult && (
          <div className="flex gap-3 items-center justify-center my-16 md:my-0">
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

            <span className="font-bold">{`${pageIndex} of ${
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
        {/* pagination button end */}
        {isLoading && (
          <div className="absolute top-0 left-0 w-full h-full bg-white/[0.5] flex flex-col gap-5 justify-center items-center">
            <img src="/logo.svg" width={150} />
            <span className="text-2xl font-medium">Loading...</span>
          </div>
        )}
      </Wrapper>
    </div>
  );
};

export default Category;

// getStaticPaths for dynamic routes
export async function getStaticPaths() {
  // Get all categories with details
  const category = await fetchDataFromApi("/api/categories?populate=*");

  const paths = category.data.map((c) => ({
    params: {
      slug: c.attributes.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  // Fetch specific category
  const category = await fetchDataFromApi(
    `/api/categories?filters[slug][$eq]=${slug}`
  );

  // Fetch products specific category and it's pagination
  const products = await fetchDataFromApi(
    `/api/products?populate=*&[filters][categories][slug][$eq]=${slug}&pagination[page]=1&pagination[pageSize]=${maxResult}`
  );

  return {
    props: { category, products, slug },
  };
}
