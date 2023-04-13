import React from "react";
import Link from "next/link";
import { BsChevronDown } from "react-icons/bs";

const moreMenuData = [
  { id: 1, name: "About", url: "/about" },
  { id: 2, name: "Contact Us", url: "/contact" },
];

const MenuMobile = ({
  showCatMenu,
  setShowCatMenu,
  setMobileMenu,
  categories,
  moreMenu,
  setMoreMenu,
}) => {
  return (
    <ul className="flex flex-col md:hidden font-bold absolute top-[50px] left-0 w-full h-[calc(100vh-50px)] bg-white border-t text-black mb-5">
      <Link
        href="/home"
        className="cursor-pointer py-4 px-5 border-b flex flex-col relative"
      >
        Home
      </Link>
      <Link
        href="/products"
        className="cursor-pointer py-4 px-5 border-b flex flex-col relative"
      >
        Products
      </Link>

      {/* Categories menu design */}
      <li
        className="cursor-pointer w-full py-4 border-b flex flex-col relative"
        onClick={() => setShowCatMenu(!showCatMenu)}
      >
        <div className="flex gap-1 px-5 items-center">
          Categories
          {/* Render chevron icon */}
          <BsChevronDown size={14} />
        </div>
        {/* Render subMenu if showCatMenu is true */}
        {showCatMenu && (
          <ul className="bg-black/[0.05] w-full top-14 left-0 min-w-[250px] px-5 mt-4 -mb-4">
            {/* Map through categories and render them as Links */}
            {categories?.map(({ attributes: c, id }) => {
              return (
                <Link
                  key={id}
                  href={`/category/${c.slug}`}
                  className="flex justify-between items-center"
                  onClick={() => setShowCatMenu(false)}
                >
                  {/* Render category name */}
                  <li className="w-full h-12 border-t flex justify-between items-center px-3 rounded-md">
                    {c.name}
                    {/* Render number of products in category */}
                    <span className="opacity-50 text-sm px-3">
                      {`(${c.products.data.length})`}
                    </span>
                  </li>
                </Link>
              );
            })}
          </ul>
        )}
      </li>

      {/* More menu design */}
      <li
        className="cursor-pointer w-full py-4 border-b flex flex-col relative"
        onClick={() => setMoreMenu(!moreMenu)}
      >
        {/* More menu & icon */}
        <div className="flex gap-1 px-5 items-center">
          More
          {/* Render chevron icon */}
          <BsChevronDown size={14} />
        </div>
        {/* Render moreMenu if moreMenu is true */}
        {moreMenu && (
          <ul className="bg-black/[0.05] w-full top-14 left-0 min-w-[250px] px-5 mt-4 -mb-4">
            {/* Map through moreMenuData and render them as Links */}
            {moreMenuData.map(({ name, url, id }) => {
              return (
                <Link
                  key={id}
                  href={url || ""}
                  className="flex items-center"
                  onClick={() => {
                    setMoreMenu(false);
                    setMobileMenu(false);
                  }}
                >
                  {/* Render menu item name */}
                  <li className="w-full h-12 border-t flex items-center px-3 rounded-md">
                    {name}
                  </li>
                </Link>
              );
            })}
          </ul>
        )}
      </li>
    </ul>
  );
};

export default MenuMobile;

// import React from "react";
// import Link from "next/link";
// import { BsChevronDown } from "react-icons/bs";

// const data = [
//   { id: 1, name: "Home", url: "/" },
//   { id: 2, name: "About", url: "/about" },
//   { id: 3, name: "Categories", subMenu: true },
//   { id: 4, name: "Contact", url: "/contact" },
// ];

// const subMenuData = [
//   { id: 1, name: "Jordan", doc_count: 11 },
//   { id: 2, name: "Sneakers", doc_count: 8 },
//   { id: 3, name: "Running shoes", doc_count: 64 },
//   { id: 4, name: "Football shoes", doc_count: 107 },
// ];

// const MenuMobile = ({
//   showCatMenu,
//   setShowCatMenu,
//   setMobileMenu,
//   categories,
// }) => {
//   return (
//     <ul className="flex flex-col md:hidden font-bold absolute top-[50px] left-0 w-full h-[calc(100vh-50px)] bg-white border-t text-black">
//       {data.map((item) => {
//         return (
//           <React.Fragment key={item.id}>
//             {!!item?.subMenu ? (
//               <li
//                 className="cursor-pointer py-4 px-5 border-b flex flex-col relative"
//                 onClick={() => setShowCatMenu(!showCatMenu)}
//               >
//                 <div className="flex justify-between items-center">
//                   {item.name}
//                   <BsChevronDown size={14} />
//                 </div>
//                 {showCatMenu && (
//                   <ul className="bg-black/[0.05] -mx-5 mt-4 -mb-4">
//                     {categories?.map(({ attributes: c, id }) => {
//                       return (
//                         <Link
//                           key={id}
//                           href={`/category/${c.slug}`}
//                           className="flex justify-between items-center"
//                           onClick={() => {
//                             setShowCatMenu(false);
//                             setMobileMenu(false);
//                           }}
//                         >
//                           <li className="py-4 px-8 border-t flex justify-between">
//                             {c.name}
//                           </li>
//                           <span className="opacity-50 text-sm px-3">
//                             {`(${c.products.data.length})`}
//                           </span>
//                         </Link>
//                       );
//                     })}
//                   </ul>
//                 )}
//               </li>
//             ) : (
//               <li className="py-4 px-5 border-b">
//                 <Link href={item?.url} onClick={() => setMobileMenu(false)}>
//                   {item.name}
//                 </Link>
//               </li>
//             )}
//           </React.Fragment>
//         );
//       })}
//     </ul>
//   );
// };

// export default MenuMobile;
