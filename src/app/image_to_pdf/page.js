import React from "react";
import ImageToPdf from "@/Components/ImageToPdf";

export default function page() {
  return (
    <div className="h-screen w-screen p-16 " id="download_img_background">
      <div className="h-screen w-screen absolute top-0 left-0 backdrop-blur-md "></div>
      <ImageToPdf />
    </div>
  );
}
