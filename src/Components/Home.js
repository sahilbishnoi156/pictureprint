"use client";
import { useState } from "react";
import Link from "next/link";
import MouseTracker from "./MouseTracker";

export default function Home() {
  const [init_scale, set_init_scale] = useState(1);
  

  return (
    <div className="h-screen w-screen  flex items-center justify-around">
      <MouseTracker def_initScale={init_scale}/>
      <div className="w-1/2 flex flex-col items-start justify-center gap-4">
        <span className="text-6xl animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent font-black">
          Picture Print
        </span>
        <p className="w-3/4 text-sm text-justify text-slate-800">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima error
          aperiam veniam nobis at odit corporis laboriosam pariatur, beatae
          architecto, vel consectetur facere maiores nisi.
        </p>
      </div>
      <div className="flex flex-col items-center justify-center gap-10 h-full text-black text-center text-2xl w-1/4" id="link-div">
        <Link
          href="/download_image"
          onMouseOver={() => set_init_scale(3)}
          onMouseLeave={() => set_init_scale(1)}
          className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-[0_2px_60px_-20px_rgba(0,0,0,0.9)] shadow-white dark:shadow-[0_2px_60px_-20px_rgba(0,0,0,0.9)] dark:shadow-white medium rounded-full w-full p-4 text-2xl text-center transition-all hover:text-pink-400 hover:scale-110 hover:shadow-[0_2px_60px_-20px_rgba(27,151,228,0.9)] custom-link-hover"
        >
          Download Image
        </Link>
        <Link
          onMouseOver={() => set_init_scale(3)}
          onMouseLeave={() => set_init_scale(1)}
          href="/image_to_pdf"
          className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-[0_2px_60px_-20px_rgba(0,0,0,0.9)] shadow-white dark:shadow-[0_2px_60px_-20px_rgba(0,0,0,0.9)] dark:shadow-white medium rounded-full w-full p-4 text-2xl text-center transition-all hover:text-pink-400 hover:scale-110 hover:shadow-[0_2px_60px_-20px_rgba(27,151,228,0.9)] custom-link-hover  "
        >
          Image to Pdf
        </Link>
        <Link
          onMouseOver={() => set_init_scale(3)}
          onMouseLeave={() => set_init_scale(1)}
          href="/download_image"
          className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-[0_2px_60px_-20px_rgba(0,0,0,0.9)] shadow-white dark:shadow-[0_2px_60px_-20px_rgba(0,0,0,0.9)] dark:shadow-white medium rounded-full w-full p-4 text-2xl text-center transition-all hover:text-pink-400 hover:scale-110 hover:shadow-[0_2px_60px_-20px_rgba(27,151,228,0.9)] custom-link-hover "
        >
          Extract Images
        </Link>
      </div>
    </div>
  );
}
