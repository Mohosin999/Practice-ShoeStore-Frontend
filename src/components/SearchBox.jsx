import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";

const SearchBox = () => {
  return (
    <div className="relative mr-4 lg:w-full xl:w-1/2 w-2/4 md:w-full text-left pl-3 pr-3">
      <label htmlFor="hero-field" className="leading-7 text-sm text-gray-600">
        Placeholder
      </label>
      <input
        type="text"
        id="hero-field"
        name="hero-field"
        className="w-full bg-gray-100 bg-opacity-50 rounded focus:ring-2 focus:ring-indigo-200 focus:bg-transparent border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
      />
    </div>
  );
};

const SearchBar = ({ theme }) => {
  const [openSearchBox, setOpenSearchBox] = useState(false);

  return (
    <>
      {/* Search & Search Box codes - start */}
      {/* Search icon start */}
      <div
        className={` ${
          theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-300"
        } w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative`}
        onClick={() => setOpenSearchBox(!openSearchBox)}
      >
        <BiSearch className="text-[24px] md:text-[28px]" />
      </div>
      {/* Search icon end */}
      {/* Show search box */}
      {openSearchBox && (
        <div className="bg-green-600 w-2/3 absolute top-24 right-10 mb-4">
          <div className=" flex w-full py-10 justify-center items-center">
            <SearchBox />
            <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-10 focus:outline-none hover:bg-indigo-600 rounded text-lg">
              Button
            </button>
          </div>
        </div>
      )}
      {/* Search & Search Box codes - end */}
    </>
  );
};

export default SearchBar;

// import React from "react";

// const SearchBox = () => {
//   return (
//     <div className=" flex w-full py-10 justify-center items-end">
//       <div className="relative mr-4 lg:w-full xl:w-1/2 w-2/4 md:w-full text-left">
//         <label for="hero-field" className="leading-7 text-sm text-gray-600">
//           Placeholder
//         </label>
//         <input
//           type="text"
//           id="hero-field"
//           name="hero-field"
//           className="w-full bg-gray-100 bg-opacity-50 rounded focus:ring-2 focus:ring-indigo-200 focus:bg-transparent border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
//         />
//       </div>
//       <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
//         Button
//       </button>
//     </div>
//   );
// };

// export default SearchBox;
