"use client";
import ShowImage from "@/Components/ShowImage";
import jsPDF from "jspdf";
import Link from "next/link";
import { useState } from "react";
import MouseTracker from "./MouseTracker";

export default function Page() {
  const [imageFiles, setImageFiles] = useState([]);
  const [showImagePreview, setShowImagePreview] = useState(false);
  const [pdfFileName, setPdfFileName] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [init_scale, setInit_scale] = useState(1);

  // Handling Image Uploading
  const handleImageChange = (e) => {
    setImageFiles(Array.from(e.target.files));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = e.dataTransfer.files;
    setImageFiles(Array.from(droppedFiles));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleLinkClick = (e) => {
    e.preventDefault();
    const file_name = e.target.textContent;

    // Search for the file in the imageFiles array
    const foundFile = imageFiles.find((file) => file.name === file_name);

    if (foundFile) {
      // Create a Blob URL for the found file
      const url = URL.createObjectURL(foundFile);
      setImageLink(url);
      setShowImagePreview(true);
    } else {
      console.log("File not found:", file_name);
    }
  };

  // Converting to pdf
  const handlePdfConvert = async () => {
    try {
      // Create a new PDF document.
      const pdf = new jsPDF();

      // Loop through each image and add it to the PDF.
      for (let i = 0; i < imageFiles.length; i++) {
        const image = imageFiles[i];
        const imgData = await getImageDataUrl(image); // Convert image to Data URL

        const img = new Image();
        img.src = imgData;

        await new Promise((resolve) => {
          img.onload = () => {
            const imgWidth = img.width; // Get the original width of the image
            const imgHeight = img.height; // Get the original height of the image

            // Calculate the aspect ratio of the image
            const aspectRatio = imgWidth / imgHeight;

            // Set the maximum width and height for the image in the PDF
            const maxWidth = 200; // Set your desired maximum width
            const maxHeight = 280; // Set your desired maximum height

            // Calculate the new width and height to fit within the maximum dimensions while maintaining aspect ratio
            let newWidth, newHeight;
            if (aspectRatio > maxWidth / maxHeight) {
              newWidth = maxWidth;
              newHeight = maxWidth / aspectRatio;
            } else {
              newHeight = maxHeight;
              newWidth = maxHeight * aspectRatio;
            }

            // Calculate the position to center the image
            const xPosition = (pdf.internal.pageSize.getWidth() - newWidth) / 2;
            const yPosition =
              (pdf.internal.pageSize.getHeight() - newHeight) / 2;

            // Add the image to the PDF using the calculated dimensions and position
            pdf.addImage(
              imgData,
              "JPEG",
              xPosition,
              yPosition,
              newWidth,
              newHeight
            );

            if (i !== imageFiles.length - 1) {
              pdf.addPage();
            }

            resolve();
          };
        });
      }

      // Save the PDF document to the local file system.
      pdf.save(`${pdfFileName.split(".")[0]}.pdf`);
    } catch (error) {
      console.error("Error converting images to PDF:", error);
    }
  };

  const getImageDataUrl = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(event.target.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="h-full w-full flex items-center justify-evenly flex-col relative z-10">
      <div className="text-pink-500 text-6xl flex items-center justify-between w-3/4 px-16 ">
        <Link
          href="/"
          className="text-4xl font-bold hover:scale-125 transition-all"
        >
          &larr;
        </Link>
        <span> Image to Pdf</span>
        <span>‎</span>
      </div>
      <div className="flex justify-between w-3/4 gap-6">
        <div className="flex items-center justify-center w-1/2">
          <label
            htmlFor="dropzone-file"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="flex flex-col items-center justify-center w-full h-full cursor-pointer  dark:hover:bg-bray-800 bg-transparent border-2 rounded-lg border-dashed p-2 box-border border-slate-800"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF
              </p>
            </div>
            <input
              type="file"
              name="images[]"
              className="hidden"
              id="dropzone-file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>
        </div>
        <div className="w-1/2 text-slate-200 flex flex-col gap-2 border-2 rounded-lg border-dashed p-2 box-border border-slate-800 overflow-auto">
          <div className="border-b-2 border-slate-800 w-full flex justify-between p-2 overflow-auto">
            <span>Uploaded Files:</span>
            <span
              onClick={() => {
                setImageFiles([]);
              }}
              className="text-slate-300 cursor-pointer"
            >
              Clear
            </span>
          </div>
          {showImagePreview ? (
            <ShowImage
              showImagePreview={showImagePreview}
              setShowImagePreview={setShowImagePreview}
              image_url={imageLink}
            />
          ) : (
            <></>
          )}
          <ol type="1" className="list-decimal h-48 overflow-auto">
            {imageFiles.map((file) => {
              return (
                <li key={file.name} id={file.name}>
                  <button onClick={handleLinkClick}>{file.name}</button>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
      <div className="w-3/4 flex gap-4 items-center justify-between">
        <div className="w-1/2 flex gap-4 items-center justify-between bg-white rounded-full p-2">
          <span className="w-28">File Name :</span>
          <input
            type="text"
            onMouseOver={() => setInit_scale(0)}
            onMouseLeave={() => setInit_scale(1)}
            className=" text-black h-full w-full bg-transparent outline-none "
            value={pdfFileName}
            onChange={(e) => setPdfFileName(e.target.value)}
          />
        </div>
        <div className="w-1/2 flex items-center justify-center">
          <button
            className="p-2 px-8 bg-white rounded-full text-slate-700 hover:bg-pink-400 hover:text-white text-xl hover:scale-110 transition-all font-semibold"
            onClick={handlePdfConvert}
            onMouseOver={() => setInit_scale(3)}
            onMouseLeave={() => setInit_scale(1)}
          >
            Convert to pdf
          </button>
        </div>
      </div>
      <MouseTracker def_initScale={init_scale} />
    </div>
  );
}
