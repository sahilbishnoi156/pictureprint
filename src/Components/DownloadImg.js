"use client";
import { useState } from "react";
import ShowImage from "./ShowImage";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const [input_url, setInput_url] = useState("");
  const [imageLook, setImageLook] = useState("contain");
  const [imageLoading, setImageLoading] = useState(false);
  const [topBanner, setTopBanner] = useState(true);
  const [filename, setFilename] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [showImagePreview, setShowImagePreview] = useState(false);

  const handleImageLook = () => {
    if (imageLook === "contain") {
      setImageLook("cover");
    } else {
      setImageLook("contain");
    }
  };
  
  const imagePreviewHandle = () => {
    setImageLoading(true);
    setImagePreview(input_url);
  };
  const imageDownload = async () => {
    setImageLoading(true);
    if (input_url.includes("youtube")) {
      const downloadUrl = input_url;
      window.location.href = downloadUrl;
    } else {
      if (input_url) {
        fetch(input_url)
        .then((response) => response.blob())
        .then((blob) => {
          const link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = `${filename.split(".")[0]}.jpg` || "my_image.jpg";
          link.click();
          window.URL.revokeObjectURL(link.href);
        })
        .catch((error) => console.error("Error downloading image:", error));
      }
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center gap-16 py-16">
      {/* Notice Banner */}
      <div
        className={`fixed ${
          topBanner ? "block" : "hidden"
        } top-0 left-0 z-50 flex justify-between w-full p-4 border-b border-gray-200 bg-gray-50 dark:bg-gray-700 dark:border-gray-600`}
      >
        <div className="flex items-center mx-auto">
          <p className="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">
            <span className="inline-flex p-1 mr-3 bg-gray-200 rounded-full dark:bg-gray-600 w-6 h-6 items-center justify-center">
              <svg
                className="w-3 h-3 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 19"
              >
                <path d="M15 1.943v12.114a1 1 0 0 1-1.581.814L8 11V5l5.419-3.871A1 1 0 0 1 15 1.943ZM7 4H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2v5a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V4ZM4 17v-5h1v5H4ZM16 5.183v5.634a2.984 2.984 0 0 0 0-5.634Z" />
              </svg>
            </span>
            <span>
              Downloaded image will be different from that currently previewing
              if randomly generated
            </span>
          </p>
        </div>
        <div className="flex items-center">
          <button
            type="button"
            className="flex-shrink-0 inline-flex justify-center w-7 h-7 items-center text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={() => setTopBanner(!topBanner)}
          >
            <i className="fa-solid fa-xmark text-white text-xl"></i>
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center justify-between w-full h-full">
        <div className="text-white text-6xl flex items-center justify-center w-full relative">
            <Link href="/" className="text-4xl absolute left-44 hover:scale-125 transition-all">&larr;</Link>
            Download Your Image
            </div>
        <div className="w-full h-full flex justify-around items-center">
          <div className="w-1/2 flex flex-col items-center justify-center gap-16 text-2xl px-8 ">
            <div className="flex justify-between w-full">
              <span className="text-4xl">Paste your link here</span>
              <button
                className="bg-red-300 rounded-full text-black p-2 px-4"
                onClick={() => {
                  setImageLoading(true);
                  let URL = `https://picsum.photos/${
                    Math.floor(Math.random() * (250 - 230 + 1)) + 230
                  }/${Math.floor(Math.random() * (350 - 330 + 1)) + 330}`;
                  setInput_url(URL);
                  setImagePreview(URL);
                }}
              >
                Random Image
              </button>
            </div>
            <div className="w-full flex flex-col gap-8">
              <label
                htmlFor="image_input"
                className="h-10 w-full rounded-full px-4 bg-white flex items-center justify-center gap-4"
              >
                <span className="text-black border-r-2 border-black w-28">
                  Link :
                </span>
                <input
                  type="text"
                  id="image_input"
                  className="h-full w-full text-black bg-transparent outline-none"
                  value={input_url}
                  onChange={(e) => setInput_url(e.target.value)}
                />
              </label>
              <label
                htmlFor="image_input"
                className="h-10 w-full rounded-full px-4 bg-white flex items-center justify-center gap-4"
              >
                <span className="text-black border-r-2 border-black w-28">
                  Name :
                </span>
                <input
                  type="text"
                  id="image_input"
                  className="h-full w-full text-black bg-transparent outline-none"
                  value={filename}
                  onChange={(e) => setFilename(e.target.value)}
                />
              </label>
            </div>
            <div className="w-full flex justify-evenly items-center">
              <button
                className={`rounded-full py-1 px-4 w-2/5 text-black text-center ${input_url ? "bg-white" : "bg-slate-400 cursor-default"}`}
                onClick={imageDownload}
              >
                Download
              </button>
              <button
                className="rounded-full bg-white py-1 px-4 w-2/5 text-black text-center"
                onClick={imagePreviewHandle}
              >
                Preview
              </button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-8 relative">
            {imageLoading && (
              <span className="absolute top-1/2 left-1/2 text-black -translate-x-1/2 -translate-y-1/2 text-2xl">
                Loading...
              </span>
            )}
           {imagePreview && <span className="text-center uppercase text-xs" id="preview_txt">
              Click to preview <br /> &darr;
            </span>}
            <Image
              src={imagePreview}
              loader={({src})=>`${src}`}
              alt="none"
              width={1000}
              height={1000}
              onLoad={()=>setImageLoading(false)}
              className={`h-52 w-52 rounded-full bg-white object-${imageLook} cursor-pointer`}
              onClick={() => {
                if (imagePreview) {
                  if (showImagePreview) {
                    setShowImagePreview(false);
                  } else {
                    setShowImagePreview(true);
                  }
                }
              }} 
            />
            {showImagePreview ? (
              <ShowImage
                image_url={imagePreview}
                setShowImagePreview={setShowImagePreview}
                showImagePreview={showImagePreview}
              />
            ) : (
              <></>
            )}
            <button
              className="rounded-full bg-white py-1 px-4 text-black text-center"
              onClick={handleImageLook}
            >
              Change Look
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
