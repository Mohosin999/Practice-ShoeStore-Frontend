import React, { useState } from "react";
import { useTheme } from "next-themes";
import { BiSearch } from "react-icons/bi";
import { ImCross } from "react-icons/im";

// Search box codes
const SearchBox = ({ openSearchBox, setOpenSearchBox }) => {
  const { theme } = useTheme();

  return (
    <div className=" flex w-full py-10 justify-center items-end">
      <div className="relative mr-4 lg:w-full xl:w-1/2 w-2/4 md:w-full text-left">
        <label
          for="hero-field"
          className={`${
            theme === "dark" ? "text-gray-400 " : "text-gray-200"
          } leading-7 text-sm`}
        >
          Search Here
        </label>
        <input
          type="text"
          id="hero-field"
          name="hero-field"
          placeholder="type here..."
          className={`${
            theme === "dark"
              ? "bg-gray-500 focus:bg-gray-700"
              : "bg-gray-900 focus:bg-gray-800"
          } w-full bg-opacity-50 rounded focus:ring-2 focus:ring-indigo-200 focus:bg-transparent border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-200 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`}
        />
      </div>
      <button
        className={`${
          theme === "dark"
            ? "bg-orange-600 hover:bg-orange-500"
            : "bg-orange-800 hover:bg-orange-700"
        } inline-flex text-white border-0 py-2 px-6 focus:outline-none rounded text-lg`}
        onClick={() => setOpenSearchBox(!openSearchBox)}
      >
        Search
      </button>

      {/* Cross icon */}
      <div
        className="absolute top-3 right-3 text-gray-200 cursor-pointer text-sm"
        onClick={() => setOpenSearchBox(!openSearchBox)}
      >
        <ImCross />
      </div>
    </div>
  );
};

// Search bar icon & search box show or hidden logic codes
const SearchBar = () => {
  const [openSearchBox, setOpenSearchBox] = useState(false);
  const { theme } = useTheme();

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
        <div
          className={`${
            theme === "dark" ? "bg-gray-800" : "bg-gray-500"
          } w-full absolute top-[50px] md:top-[80px] right-0 mb-4 shadow-lg`}
        >
          <SearchBox
            openSearchBox={openSearchBox}
            setOpenSearchBox={setOpenSearchBox}
          />
        </div>
      )}
      {/* Search & Search Box codes - end */}
    </>
  );
};

export default SearchBar;
