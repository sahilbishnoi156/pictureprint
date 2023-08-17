import React from "react";

export default function ShowImage({
  image_url,
  showImagePreview,
  setShowImagePreview,
}) {
  const handleImageClose = () => {
    if (showImagePreview) {
      setShowImagePreview(false);
    } else {
      setShowImagePreview(true);
    }
  };
  return (
    <div
      className="h-screen w-screen fixed top-0 left-0 bg-white z-50 flex items-center justify-center"
      id="img-background"
    >
      <div
        className="absolute top-0 right-0 m-8 cursor-pointer"
        onClick={handleImageClose}
      >
        <i className="fa-solid fa-xmark text-white text-4xl"></i>
      </div>
      <div
        className="w-3/4 h-3/4 bg-black border-2 rounded-xl"
        onBlur={handleImageClose}
      >
        <img
          src={image_url}
          alt="Notfound"
          className="object-contain h-full w-full"
        />
      </div>
    </div>
  );
}
