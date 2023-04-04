import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IoMdHeartEmpty } from "react-icons/io";
import Wrapper from "@/components/Wrapper";
import ProductDetailsCarousel from "@/components/ProductDetailsCarousel";
import RelatedProducts from "@/components/RelatedProducts";
import { fetchDataFromApi } from "@/utils/api";
import { getDiscountedPricePercentage } from "@/utils/helper";
import { addToCart } from "@/store/cartSlice";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetails = ({ product, products }) => {
  const [selectedSize, setSelectedSize] = useState();
  const [showError, setShowError] = useState(false);
  const dispatch = useDispatch();

  const p = product?.data?.[0]?.attributes;

  // toast message
  const notify = () => {
    toast.success("Success. Check your cart!", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  return (
    <div className="w-full md:py-20">
      <ToastContainer />
      <Wrapper>
        <div className="flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px]">
          {/* left column start */}
          <div className="w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0">
            <ProductDetailsCarousel images={p.image.data} />
          </div>
          {/* left column end */}

          {/* right column start */}
          <div className="flex-[1] py-3">
            {/* product title */}
            <div className="text-[34px] font-semibold mb-2 leading-tight">
              {p.name}
            </div>

            {/* product subtitle */}
            <div className="text-lg font-semibold mb-5">{p.subtitle}</div>

            {/* product price start */}
            <div className="flex items-center">
              <p className="mr-2 text-lg font-semibold">
                MRP : &#2547;{p.price}
              </p>
              {p.original_price && (
                <>
                  <p className="text-base  font-medium line-through">
                    &#2547;{p.original_price}
                  </p>
                  <p className="ml-auto text-base font-medium text-green-500">
                    {getDiscountedPricePercentage(p.original_price, p.price)}%
                    off
                  </p>
                </>
              )}
            </div>
            {/* product price end */}

            <div className="text-md font-medium text-black/[0.5]">
              incl. of taxes
            </div>
            <div className="text-md font-medium text-black/[0.5] mb-20">
              {`(Also includes all applicable duties)`}
            </div>

            {/* product size range start */}
            <div className="mb-10">
              {/* heading start */}
              <div className="flex justify-between mb-2">
                <div className="text-md font-semibold">Select Size</div>
                <div className="text-md font-medium text-black/[0.5] cursor-pointer">
                  Select Guide
                </div>
              </div>
              {/* heading end */}

              {/* size start */}
              <div id="sizesGrid" className="grid grid-cols-3 gap-2">
                {p.size.data.map((item, i) => (
                  <div
                    key={i}
                    className={`border rounded-md text-center py-3 font-medium ${
                      item.enabled
                        ? "hover:border-black cursor-pointer"
                        : "cursor-not-allowed bg-black/[0.1] opacity-50"
                    } ${selectedSize === item.size ? "border-black" : ""}`}
                    onClick={() => {
                      setSelectedSize(item.size);
                      setShowError(false);
                    }}
                  >
                    {item.size}
                  </div>
                ))}
              </div>
              {/* size end */}

              {/* show error if size not selected - start */}
              {showError && (
                <div className="text-red-600 mt-1">
                  Size selection is required
                </div>
              )}
              {/* show error if size not selected - end */}
            </div>
            {/* product size range end */}

            {/* add to cart button start */}
            <button
              className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75"
              onClick={() => {
                if (!selectedSize) {
                  setShowError(true);
                  document.getElementById("sizesGrid").scrollIntoView({
                    block: "center",
                    behavior: "smooth",
                  });
                } else {
                  dispatch(
                    addToCart({
                      ...product?.data?.[0],
                      selectedSize,
                      oneQuantityPrice: p.price,
                    })
                  );
                  notify();
                }
              }}
            >
              Add To Cart
            </button>
            {/* add to cart button end */}

            {/* wishlist button start */}
            <button className="w-full py-4 rounded-full border border-black text-lg font-medium transition-transform active:scale-95 flex items-center justify-center gap-2 hover:opacity-75 mb-10">
              Whishlist
              <IoMdHeartEmpty size={20} />
            </button>
            {/* wishlist button end */}

            {/* product details area */}
            <div>
              <div className="text-lg font-bold mb-5">Product Details</div>
              <div className=" text-md mb-5">{p.description}</div>
            </div>
          </div>
          {/* left column end */}
        </div>

        {/* related products component */}
        <RelatedProducts products={products} />
      </Wrapper>
    </div>
  );
};

export default ProductDetails;

// getStaticPaths for dynamic routes
export async function getStaticPaths() {
  const products = await fetchDataFromApi("/api/products?populate=*");

  const paths = products.data.map((p) => ({
    params: {
      slug: p.attributes.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  // fetch data for specific product
  const product = await fetchDataFromApi(
    `/api/products?populate=*&filters[slug][$eq]=${slug}`
  );

  // fetch products of related category product and it's pagination
  const products = await fetchDataFromApi(
    // `/api/products?populate=*&[filters][categories][slug][$eq]=${slug}&pagination[page]=1&pagination[pageSize]=${maxResult}`
    `/api/products?populate=*&[filters][slug][$ne]=${slug}`
  );

  return {
    props: { product, products },
  };
}
