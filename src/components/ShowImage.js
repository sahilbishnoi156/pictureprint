import Image from "next/image";
import React from "react";

export default function ShowImage({
  image_url,
  showImagePreview,
  setShowImagePreview,
}) {
  const imageLoader = ({ src, width, quality }) => {
    return `${src}`
  }
  const handleImageClose = () => {
    if (showImagePreview) {
      setShowImagePreview(false);
    } else {
      setShowImagePreview(true);
    }
  };
  return (
    <div
      className="h-screen w-screen fixed top-0 left-0  z-50 flex items-center justify-center backdrop-blur-sm bg-black/30"
    >
      <div
        className="absolute top-0 right-0 m-8 cursor-pointer"
        onClick={handleImageClose}
      >
        <i className="fa-solid fa-xmark text-4xl text-white"></i>
      </div>
      <div
        className="w-3/4 h-3/4 rounded-xl relative"
        onBlur={handleImageClose}
      >
        <Image
          src={image_url}
          loader={imageLoader}
          fill
          quality={100}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          alt="Notfound"
          className="object-contain h-full w-full"
        />
      </div>
    </div>
  );
}
