import { useTheme } from "next-themes";
// import HeroBanner from "@/components/HeroBanner";
import ProductCard from "@/components/ProductCard";
import Wrapper from "@/components/Wrapper";
import { fetchDataFromApi } from "@/utils/api";

const Home = ({ products }) => {
  const { theme } = useTheme();

  return (
    <main>
      {/* It's slider - react responsive carousel */}
      {/* <HeroBanner /> */}
      <Wrapper>
        {/* Home page title and paragraph start */}
        <div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
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
        </div>
        {/* Home page title and paragraph end */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
          <h2>Newest Shoes</h2>
        </div>

        {/* products grid start */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
          {products?.data?.map((product) => {
            return <ProductCard key={product?.id} data={product} />;
          })}
        </div>
        {/* products grid end */}
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
