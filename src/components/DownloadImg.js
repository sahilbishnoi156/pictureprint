"use client";
import { useState } from "react";
import ShowImage from "./ShowImage";
import Link from "next/link";
import Image from "next/image";
import _ from "lodash";

export default function DownloadImg() {
  const [input_url, setInput_url] = useState("");
  const [imageLook, setImageLook] = useState("contain");
  const [imageLoading, setImageLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [filename, setFilename] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [showImagePreview, setShowImagePreview] = useState(false);
  const [isInvalidUrl, setIsInvalidUrl] = useState(false);

  const imageDownload = _.debounce(async () => {
    try {
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
              link.download = `${filename.split(".")[0] || "picture_print_downloaded_image"}.jpg`;
              link.click();
              window.URL.revokeObjectURL(link.href);
            })
            .catch((error) => console.error("Error downloading image:", error));
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsDownloading(false);
    }
  }, 2000);

  const handleImageLook = () => {
    if (imageLook === "contain") {
      setImageLook("cover");
    } else {
      setImageLook("contain");
    }
  };
  const isValidUrl = (urlString) => {
    let url;
    try {
      url = new URL(urlString);
    } catch (e) {
      setIsInvalidUrl(true);
      return false;
    }
    if (url.protocol === "http:" || url.protocol === "https:") {
      setIsInvalidUrl(false);
      return true;
    }
  };

  const imagePreviewHandle = () => {
    setImagePreview(input_url);
  };

  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-evenly w-full h-full bg-transparent rounded-2xl p-4">
      {showImagePreview && (
        <ShowImage
          image_url={imagePreview}
          setShowImagePreview={setShowImagePreview}
          showImagePreview={showImagePreview}
        />
      )}
      <div className="md:text-6xl text-xl flex items-center justify-between md:w-3/4 gap-4 text-blue-500 ">
        <Link href="/" className=" md:text-4xl hover:scale-125 transition-all">
          <i className="fa-solid fa-arrow-left-long"></i>
        </Link>
        <span> Download Your Image</span>
        <span>‎</span>
      </div>
      <div className="w-full h-full flex justify-around items-center flex-col-reverse md:flex-row mt-2 gap-4 ">
        <div className="md:w-1/2 flex flex-col items-start justify-center gap-12 md:text-2xl text-lg md:px-8 w-full">
          <p className="text-black dark:text-white md:block hidden">
            Generate Random 144 to 4k{" "}
            <span className=" text-blue-500 m">Images</span>, preview and
            download the images with original quality.
          </p>
          <div className="w-full flex flex-col md:gap-8 gap-4">
            <label
              htmlFor="image_input"
              className="h-10 w-full rounded-full  gap-4 text-sm text-black dark:text-white"
            >
              <input
                type="text"
                placeholder="Enter Image Url"
                id="image_input"
                className="text-black h-full w-full py-2 md:text-xl text-lg px-2 rounded-2xl outline-none placeholder:text-neutral-600 bg-gray-300 "
                value={input_url}
                onChange={(e) => {
                  isValidUrl(e.target.value);
                  setInput_url(e.target.value);
                }}
              />
              {isInvalidUrl && <p className="ml-2 text-red-600">Invalid URL</p>}
              
            </label>
            <label
              htmlFor="image_input"
              className="h-10 w-full rounded-full flex items-center justify-center gap-4 text-sm text-black dark:text-white"
            >
              <input
                type="text"
                id="image_input"
                placeholder="Enter File Name"
                className=" text-black h-full w-full py-2 md:text-xl text-lg px-2 rounded-2xl outline-none placeholder:text-neutral-600 bg-gray-300 "
                value={filename}
                onChange={(e) => setFilename(e.target.value)}
              />
            </label>
          </div>
          <div className="w-full flex justify-evenly items-center md:gap-8 gap-3 flex-col md:flex-row">
            <button
              className={`text-xl px-6 py-1 bg-blue-500 text-white rounded-xl w-full ${
                input_url.length === 0 && "disabled:bg-gray-500"
              }`}
              disabled={input_url.length === 0}
              onClick={() => {
                setIsDownloading(true);
                imageDownload();
              }}
            >
              {isDownloading ? (
                <div
                  role="status"
                  className="flex flex-row-reverse items-center justify-center gap-2"
                >
                  Downloading
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                <span>Download</span>
              )}
            </button>

            <button
              className={`text-xl px-6 py-1 bg-blue-500 text-white rounded-xl w-full ${
                input_url.length === 0 && "disabled:bg-gray-500"
              }`}
              disabled={input_url.length === 0}
              onClick={imagePreviewHandle}
            >
              Preview
            </button>
            <button
              className={`text-xl px-6 py-1 bg-blue-500 text-white rounded-xl w-full`}
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
        <div className="flex flex-col items-center justify-center md:gap-8 gap-2">
          {imagePreview && (
            <span
              className="text-center uppercase text-xs text-black dark:text-white hidden md:block"
              id="preview_txt"
            >
              Click to preview <br /> &darr;
            </span>
          )}
          <div className="h-52 w-52 rounded-full p-1 border-2 border-black relative z-0">
            {imageLoading && (
              <span className="absolute top-1/2 left-1/2 text-gray-700 -translate-x-1/2 -translate-y-1/2 text-2xl">
                Loading...
              </span>
            )}
            <Image
              src={
                !imageLoading &&
                (imagePreview ||
                  "https://static.vecteezy.com/system/resources/thumbnails/009/171/100/small/demo-symbol-concept-words-demo-on-wooden-blocks-photo.jpg")
              }
              loader={({ src }) =>
                `${
                  src ||
                  "https://static.vecteezy.com/system/resources/thumbnails/009/171/100/small/demo-symbol-concept-words-demo-on-wooden-blocks-photo.jpg"
                }`
              }
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
            className="rounded-full bg-blue-500 py-1 px-4 text-white hover:bg-blue-700 w-full"
            onClick={handleImageLook}
          >
            Change Look
          </button>
        </div>
      </div>
    </div>
  );
}
