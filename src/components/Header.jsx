import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useSelector } from "react-redux";

import { IoMdHeartEmpty } from "react-icons/io";
import { BsCart, BsSun } from "react-icons/bs";
import { HiMoon } from "react-icons/hi";
import { BiMenuAltRight, BiSearch } from "react-icons/bi";
import { VscChromeClose } from "react-icons/vsc";

import Wrapper from "./Wrapper";
import Menu from "./Menu";
import MenuMobile from "./MenuMobile";
import { fetchDataFromApi } from "@/utils/api";

const Header = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showCatMenu, setShowCatMenu] = useState(false);
  const [moreMenu, setMoreMenu] = useState(false);
  const [show, setShow] = useState("translate-y-0");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [categories, setCategories] = useState(null);

  const { cartItems } = useSelector((state) => state.cart);

  // This code is for dark or light mode - start
  const { theme, setTheme } = useTheme();

  // Handler function to handle theme mode
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  // This code is for dark or light mode - end

  // scroll window and hide header - logic start
  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("-translate-y-[80px]");
      } else {
        setShow("shadow-sm");
      }
    } else {
      setShow("translate-y-0");
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);
  // scroll window and hide header - logic end

  // fetch category data start
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const { data } = await fetchDataFromApi("/api/categories?populate=*");
    setCategories(data);
  };
  // fetch category data end

  return (
    <header
      className={`w-full h-[50px] md:h-[80px] ${
        theme === "dark" ? "bg-green-600" : "bg:white"
      } flex items-center justify-between z-20 sticky top-0 transition-transform duration-300 ${show}`}
    >
      <Wrapper className={"h-[60px] flex justify-between items-center"}>
        {/* left side header logo */}
        <Link href={"/"}>
          <img
            src="/logo.svg"
            alt="ShoeIcon"
            className="w-[40px] md:w-[60px]"
          />
          {/* <img
            src="/white-nike.svg"
            alt="ShoeIcon"
            className="w-[56px] md:w-[84px]"
          /> */}
        </Link>

        {/* middle side header menu */}
        <Menu
          showCatMenu={showCatMenu}
          setShowCatMenu={setShowCatMenu}
          categories={categories}
          moreMenu={moreMenu}
          setMoreMenu={setMoreMenu}
        />

        {/* header mobile menu */}
        {mobileMenu && (
          <MenuMobile
            showCatMenu={showCatMenu}
            setShowCatMenu={setShowCatMenu}
            setMobileMenu={setMobileMenu}
            categories={categories}
            moreMenu={moreMenu}
            setMoreMenu={setMoreMenu}
          />
        )}

        {/* right side header menu icons */}
        <div className="flex items-center gap-2 text-black">
          {/* Theme Mode - Moon or Sun icon start */}
          {/* Condition for theme mode icons */}
          {theme === "dark" ? (
            <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative">
              <BsSun
                className="text-[19px] md:text-[24px]"
                onClick={toggleTheme}
              />
            </div>
          ) : (
            <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative">
              <HiMoon
                className="text-[19px] md:text-[24px]"
                onClick={toggleTheme}
              />
            </div>
          )}
          {/* Theme Mode - Moon or Sun icon end */}

          {/* Search icon start */}
          <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative">
            <BiSearch className="text-[19px] md:text-[24px]" />
          </div>
          {/* Search icon end */}

          {/* Wishlist icon start */}
          <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative">
            <IoMdHeartEmpty className="text-[19px] md:text-[24px]" />
            <div className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[14px] rounded-full bg-red-600 absolute top-1 left-5 md:left-7 text-white text-[10px] md:text-[12px] flex items-center justify-center px-[2px] md:px[5px]">
              50
            </div>
          </div>
          {/* Wishlist icon end */}

          {/* Cart icon start */}
          <Link href={"/cart"}>
            <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative">
              <BsCart className="text-[15px] md:text-[20px]" />
              {cartItems.length > 0 && (
                <div className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full bg-red-600 absolute top-1 left-5 md:left-7 text-white text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px-[5px]">
                  {cartItems.length}
                </div>
              )}
            </div>
          </Link>
          {/* Cart icon end */}
          {/* mobile menu icon start */}
          <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex md:hidden justify-center items-center hover:bg-black/[0.05] cursor-pointer relative -mr-2">
            {mobileMenu ? (
              <VscChromeClose
                className="text-[16px]"
                onClick={() => setMobileMenu(false)}
              />
            ) : (
              <BiMenuAltRight
                className="text-[20px]"
                onClick={() => setMobileMenu(true)}
              />
            )}
          </div>
          {/* mobile menu icon end */}
        </div>
      </Wrapper>
    </header>
  );
};

export default Header;

// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import { IoMdHeartEmpty } from "react-icons/io";
// import { BsCart } from "react-icons/bs";
// import { BiMenuAltRight } from "react-icons/bi";
// import { VscChromeClose } from "react-icons/vsc";
// import Wrapper from "./Wrapper";
// import Menu from "./Menu";
// import MenuMobile from "./MenuMobile";
// import { fetchDataFromApi } from "@/utils/api";
// import { useSelector } from "react-redux";

// const Header = () => {
//   const [mobileMenu, setMobileMenu] = useState(false);
//   const [showCatMenu, setShowCatMenu] = useState(false);
//   const [show, setShow] = useState("translate-y-0");
//   const [lastScrollY, setLastScrollY] = useState(0);
//   const [categories, setCategories] = useState(null);

//   const { cartItems } = useSelector((state) => state.cart);

//   // scroll window and hide header - logic start
//   const controlNavbar = () => {
//     if (window.scrollY > 200) {
//       if (window.scrollY > lastScrollY && !mobileMenu) {
//         setShow("-translate-y-[80px]");
//       } else {
//         setShow("shadow-sm");
//       }
//     } else {
//       setShow("translate-y-0");
//     }
//     setLastScrollY(window.scrollY);
//   };

//   useEffect(() => {
//     window.addEventListener("scroll", controlNavbar);
//     return () => {
//       window.removeEventListener("scroll", controlNavbar);
//     };
//   }, [lastScrollY]);
//   // scroll window and hide header - logic end

//   // fetch category data start
//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     const { data } = await fetchDataFromApi("/api/categories?populate=*");
//     setCategories(data);
//   };
//   // fetch category data end

//   return (
//     <header
//       className={`w-full h-[50px] md:h-[80px] bg-white flex items-center justify-between z-20 sticky top-0 transition-transform duration-300 ${show}`}
//     >
//       <Wrapper className={"h-[60px] flex justify-between items-center"}>
//         {/* left side header logo */}
//         <Link href={"/"}>
//           <img
//             src="/logo.svg"
//             alt="ShoeIcon"
//             className="w-[40px] md:w-[60px]"
//           />
//         </Link>

//         {/* middle side header menu */}
//         <Menu
//           showCatMenu={showCatMenu}
//           setShowCatMenu={setShowCatMenu}
//           categories={categories}
//         />

//         {/* header mobile menu */}
//         {mobileMenu && (
//           <MenuMobile
//             showCatMenu={showCatMenu}
//             setShowCatMenu={setShowCatMenu}
//             setMobileMenu={setMobileMenu}
//             categories={categories}
//           />
//         )}

//         {/* right side header menu icons */}
//         <div className="flex items-center gap-2 text-black">
//           {/* icon start */}
//           <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative">
//             <IoMdHeartEmpty className="text-[19px] md:text-[24px]" />
//             <div className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[14px] rounded-full bg-red-600 absolute top-1 left-5 md:left-7 text-white text-[10px] md:text-[12px] flex items-center justify-center px-[2px] md:px[5px]">
//               50
//             </div>
//           </div>
//           {/* icon end */}

//           {/* icon start */}
//           <Link href={"/cart"}>
//             <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative">
//               <BsCart className="text-[15px] md:text-[20px]" />
//               {cartItems.length > 0 && (
//                 <div className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full bg-red-600 absolute top-1 left-5 md:left-7 text-white text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px-[5px]">
//                   {cartItems.length}
//                 </div>
//               )}
//             </div>
//           </Link>
//           {/* icon end */}

//           {/* mobile menu icon start */}
//           <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex md:hidden justify-center items-center hover:bg-black/[0.05] cursor-pointer relative -mr-2">
//             {mobileMenu ? (
//               <VscChromeClose
//                 className="text-[16px]"
//                 onClick={() => setMobileMenu(false)}
//               />
//             ) : (
//               <BiMenuAltRight
//                 className="text-[20px]"
//                 onClick={() => setMobileMenu(true)}
//               />
//             )}
//           </div>
//           {/* mobile menu icon end */}
//         </div>
//       </Wrapper>
//     </header>
//   );
// };

// export default Header;
