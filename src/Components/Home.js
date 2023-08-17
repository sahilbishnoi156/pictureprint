import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen w-screen bg-black flex flex-col items-center justify-evenly">
      <div className="text-6xl w-full text-center">Services</div>
      <div className="flex items-center justify-evenly text-black w-full text-center text-2xl">
        <Link href="/download_image" className="px-4 py-6 rounded-3xl bg-white w-1/4 hover:scale-110 hover:text-blue-700 transition-all text-orange-600">
          Download Image
        </Link>
        <Link href="/image_to_pdf" className="px-4 py-6 rounded-3xl bg-white w-1/4 hover:scale-110 hover:text-blue-700 transition-all text-orange-600">
          Image &rarr; Pdf
        </Link>
        <Link href="/download_image" className="px-4 py-6 rounded-3xl bg-white w-1/4 hover:scale-110 hover:text-blue-700 transition-all text-orange-600">
          Extract Image
        </Link>
        {/* <DownloadImg/> */}
      </div>
    </div>
  );
}
