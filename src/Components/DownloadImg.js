"use client";
import { useState } from "react";
import ShowImage from "./ShowImage";
import Link from "next/link";
import MouseTracker from "./MouseTracker";
import Image from "next/image";

export default function Home() {
  const [input_url, setInput_url] = useState("");
  const [init_scale, set_init_scale] = useState(1);
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
    setImageLoading(true);
    if (input_url.includes("youtube")) {
      const downloadUrl = input_url;
      window.location.href = downloadUrl;
    } else {
      if (input_url) {
        fetch(input_url)
          .then((response) => response.blob())
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
    <div
      className="h-screen w-screen flex flex-col items-center justify-center gap-16 p-16 bg-transparent font-extrabold text-gray-400"
      id="download_img_background"
    >
      <MouseTracker def_initScale={init_scale} />
      <div className="h-screen w-screen absolute top-0 left-0 backdrop-blur-md "></div>
      {showImagePreview ? (
        <ShowImage
          image_url={imagePreview}
          setShowImagePreview={setShowImagePreview}
          showImagePreview={showImagePreview}
        />
      ) : (
        <></>
      )}
      <div
        className="flex flex-col items-center justify-between w-full h-full bg-transparent rounded-2xl relative z-40 p-4 "
        id="download_img_background_inner"
      >
        <div className="text-pink-500 text-6xl flex items-center justify-between w-full px-16 ">
          <Link
            href="/"
            className="text-4xl font-bold hover:scale-125 transition-all"
          >
            &larr;
          </Link>
          <span> Download Your Image</span>
          <span>‎</span>
        </div>
        <div className="w-full h-full flex justify-around items-center">
          <div className="w-3/4 flex flex-col items-start justify-center gap-12 text-2xl px-8 ">
            <div className="w-3/4">
              <p className="">
                Lorem, ipsum dolor sit amet <span className="text-pink-500 underline ">consectetur</span> adipisicing elit.
                Dolorum, repellat! Lorem ipsum dolor sit amet.
              </p>
            </div>
            <div className="w-3/4 flex flex-col gap-8">
              <label
                htmlFor="image_input"
                className="h-10 w-full rounded-full px-4 bg-white flex items-center justify-center gap-4 text-sm"
              >
                <span className="text-gray-700 border-r-2 border-black w-20">
                  Link :
                </span>
                <input
                  type="text"
                  id="image_input"
                  onMouseOver={() => set_init_scale(0)}
                onMouseLeave={() => set_init_scale(1)}
                  className="h-full w-full text-gray-700 bg-transparent outline-none"
                  value={input_url}
                  onChange={(e) => setInput_url(e.target.value)}
                />
              </label>
              <label
                htmlFor="image_input"
                className="h-10 w-full rounded-full px-4 bg-white flex items-center justify-center gap-4 text-sm"
              >
                <span className="text-gray-700 border-r-2 border-black w-20">
                  Name :
                </span>
                <input
                  type="text"
                  onMouseOver={() => set_init_scale(0)}
                onMouseLeave={() => set_init_scale(1)}
                  id="image_input"
                  className="h-full w-full text-gray-700 bg-transparent outline-none"
                  value={filename}
                  onChange={(e) => setFilename(e.target.value)}
                />
              </label>
            </div>
            <div className="w-3/4 flex justify-evenly items-center gap-8">
              <button
                onMouseOver={() => set_init_scale(3)}
                onMouseLeave={() => set_init_scale(1)}
                className={`text-xl hover:text-white hover:text-lg rounded-full py-1 px-4 w-2/5 text-gray-700 text-center ${
                  input_url ? "bg-white" : "bg-slate-400 cursor-default"
                } hover:scale-110 transition hover:bg-pink-400`}
                onClick={imageDownload}
              >
                Download
              </button>
              <button
                onMouseOver={() => set_init_scale(3)}
                onMouseLeave={() => set_init_scale(1)}
                className="text-xl hover:text-white hover:text-lg rounded-full bg-white py-1 px-4 w-2/5 text-gray-700 text-center hover:scale-110 transition hover:bg-pink-400"
                onClick={imagePreviewHandle}
              >
                Preview
              </button>
              <button
                onMouseOver={() => set_init_scale(3)}
                onMouseLeave={() => set_init_scale(1)}
                className="text-xl hover:text-white hover:text-lg rounded-full bg-white py-1 px-4 w-2/5 text-gray-700 text-center hover:scale-110 transition hover:bg-pink-400"
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
                className="text-center uppercase text-xs text-white"
                id="preview_txt"
              >
                Click to preview <br /> &darr;
              </span>
            )}
            <div className="h-52 w-52 rounded-full p-1 border-2">
            <Image
              src={imagePreview || "https://static.vecteezy.com/system/resources/thumbnails/009/171/100/small/demo-symbol-concept-words-demo-on-wooden-blocks-photo.jpg"}
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
              className="rounded-full bg-white py-1 px-4 text-gray-700 text-center"
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
