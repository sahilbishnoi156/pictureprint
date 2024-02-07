"use client";
import { useState } from "react";
import ShowImage from "./ShowImage";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const [input_url, setInput_url] = useState("");
  const [imageLook, setImageLook] = useState("contain");
  const [imageLoading, setImageLoading] = useState(false);
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
    setImagePreview(input_url);
  };
  const imageDownload = async () => {
    if (input_url.includes("youtube")) {
      const downloadUrl = input_url;
      window.location.href = downloadUrl;
    } else {
      if (input_url) {
        fetch(input_url)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.blob();
          })
          .then((blob) => {
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = `${filename.split(".")[0] || "my_image"}.jpg`;
            link.click();
            window.URL.revokeObjectURL(link.href);
          })
          .catch((error) => console.error("Error downloading image:", error));
      }
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center gap-16 p-16 bg-transparent dark:bg-[#151515] bg-white text-black dark:text-white">
      {showImagePreview && (
        <ShowImage
          image_url={imagePreview}
          setShowImagePreview={setShowImagePreview}
          showImagePreview={showImagePreview}
        />
      )}
      <div className="flex flex-col items-center justify-between w-full h-full bg-transparent rounded-2xl relative z-40 p-4 ">
        <div className="text-6xl flex items-center justify-between w-full px-16 text-blue-500">
          <Link href="/" className="text-4xl hover:scale-125 transition-all">
            <i className="fa-solid fa-arrow-left-long"></i>
          </Link>
          <span> Download Your Image</span>
          <span>‎</span>
        </div>
        <div className="w-full h-full flex justify-around items-center">
          <div className="w-3/4 flex flex-col items-start justify-center gap-12 text-2xl px-8 ">
            <div className="w-3/4">
              <p className="text-black dark:text-white">
                Lorem, ipsum dolor sit amet{" "}
                <span className=" underline text-blue-500">consectetur</span>{" "}
                adipisicing elit. Dolorum, repellat! Lorem ipsum dolor sit amet.
              </p>
            </div>
            <div className="w-3/4 flex flex-col gap-8">
              <label
                htmlFor="image_input"
                className="h-10 w-full rounded-full px-4 flex items-center justify-center gap-4 text-sm text-black dark:text-white"
              >
                <span className="border-r-2 border-black w-20 text-black dark:text-white">
                  Link :
                </span>
                <input
                  type="text"
                  id="image_input"
                  className=" text-black h-full w-full bg-gray-400 py-1 px-2 rounded-2xl dark:text-white  outline-none "
                  value={input_url}
                  onChange={(e) => setInput_url(e.target.value)}
                />
              </label>
              <label
                htmlFor="image_input"
                className="h-10 w-full rounded-full px-4 flex items-center justify-center gap-4 text-sm text-black dark:text-white"
              >
                <span className="border-r-2 border-black w-20 text-black dark:text-white">
                  Name :
                </span>
                <input
                  type="text"
                  id="image_input"
                  className=" text-black h-full w-full bg-gray-400 py-1 px-2 rounded-2xl dark:text-white  outline-none "
                  value={filename}
                  onChange={(e) => setFilename(e.target.value)}
                />
              </label>
            </div>
            <div className="w-3/4 flex justify-evenly items-center gap-8">
              <button
                className={`text-xl px-6 py-1 bg-blue-500 text-white rounded-xl ${
                  input_url.length === 0 && "disabled:bg-gray-500"
                }`}
                disabled={input_url.length === 0}
                onClick={imageDownload}
              >
                Download
              </button>
              <button
                className={`text-xl px-6 py-1 bg-blue-500 text-white rounded-xl ${
                  input_url.length === 0 && "disabled:bg-gray-500"
                }`}
                disabled={input_url.length === 0}
                onClick={imagePreviewHandle}
              >
                Preview
              </button>
              <button
                className={`text-xl px-6 py-1 bg-blue-500 text-white rounded-xl`}
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
          </div>
          <div className="flex flex-col items-center justify-center gap-8 relative">
            {imageLoading && (
              <span className="absolute top-1/2 left-1/2 text-gray-700 -translate-x-1/2 -translate-y-1/2 text-2xl">
                Loading...
              </span>
            )}
            {imagePreview && (
              <span
                className="text-center uppercase text-xs text-black dark:text-white   "
                id="preview_txt"
              >
                Click to preview <br /> &darr;
              </span>
            )}
            <div className="h-52 w-52 rounded-full p-1 border-2 border-black">
              <Image
                src={
                   !imageLoading && (imagePreview ||
                  "https://static.vecteezy.com/system/resources/thumbnails/009/171/100/small/demo-symbol-concept-words-demo-on-wooden-blocks-photo.jpg")
                }
                loader={({ src }) => `${src}`}
                alt="none"
                width={1000}
                height={1000}
                onLoad={() => setImageLoading(false)}
                className={`h-full w-full rounded-full bg-white text-white object-${imageLook} cursor-pointer`}
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
            </div>
            <button
              className="rounded-full bg-blue-500 py-1 px-4 text-white hover:bg-blue-700"
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
