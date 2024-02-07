import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <div className="flex items-center justify-between px-6 py-3 text-xs  bg-white dark:bg-[#151515] shadow-neutral-400 dark:shadow-gray-500 text-black dark:text-white rounded-b-xl flex-col sm:flex-row md:gap-0 gap-2 ">
      <Link className="text-2xl flex items-center justify-center gap-2 font-medium" href={'/'}>
        <span>
          P<i className="fa-solid fa-image text-blue-500"></i>
        </span>
        PRINT
      </Link>
      <ul className="flex items-center gap-6">
        <li><Link href={'/download_image'}>DOWNLOAD IMAGE</Link></li>
        <li><Link href={'/image_to_pdf'}>IMAGE TO PDF</Link></li>
      </ul>
    </div>
  );
}
