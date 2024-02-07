"use client";
import ShowImage from "@/components/ShowImage";
import jsPDF from "jspdf";
import Link from "next/link";
import { useState } from "react";

export default function ImageToPdf() {
  const [imageFiles, setImageFiles] = useState([]);
  const [showImagePreview, setShowImagePreview] = useState(false);
  const [pdfFileName, setPdfFileName] = useState("");
  const [imageLink, setImageLink] = useState("");

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
      pdf.save(`${pdfFileName.split(".")[0] || "My_pdf"}.pdf`);
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
    <div className="min-h-[90vh] w-full flex items-center justify-evenly flex-col dark:bg-[#151515] bg-white py-8">
      <div className="text-blue-500 md:text-6xl text-2xl flex items-center justify-between md:w-3/4 md:px-16 px-4 gap-8 mb-4">
        <Link
          href="/"
          className="md:text-4xl hover:scale-105 transition-all"
        >
          <i className="fa-solid fa-arrow-left-long"></i>
        </Link>
        <span> Image to Pdf</span>
        <span>‎</span>
      </div>
      <div className="flex justify-between md:w-3/4 gap-6 flex-col md:flex-row">
        <div className="flex items-center justify-center md:w-1/2 text-gray-500">
          <label
            htmlFor="dropzone-file"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="flex flex-col items-center justify-center w-full h-full cursor-pointer  dark:hover:bg-bray-800 bg-transparent border-2 rounded-lg border-dashed p-2 box-border border-slate-800 dark:border-white"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 "
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
              <p className="mb-2 text-sm  ">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs ">
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
        <div className="md:w-1/2  flex flex-col gap-2 border-2 rounded-lg border-dashed p-2 box-border border-slate-800 overflow-auto dark:border-white">
          <div className="border-b-2 border-slate-800 w-full flex justify-between p-2 overflow-auto dark:border-white text-black dark:text-white">
            <span>Uploaded Files:</span>
            <span
              onClick={() => {
                setImageFiles([]);
              }}
              className="cursor-pointer"
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
          <ol type="1" className="h-48 overflow-auto list-decimal text-black dark:text-white">
            {imageFiles.map((file, index) => {
              return (
                <li key={file.name} id={file.name}>
                  <span className="mr-2">{index+1}.</span><button onClick={handleLinkClick}>{file.name}</button>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
      <div className="w-3/4 flex gap-4 items-center justify-between text-black dark:text-white flex-col md:flex-row mt-4">
        <div className="md:w-1/2 flex gap-4 items-center justify-between rounded-full ">
          <input
            type="text"
            className=" text-black h-full w-full py-2 md:text-xl text-lg px-2 rounded-2xl outline-none placeholder:text-neutral-600 bg-gray-300 "
            value={pdfFileName}
            placeholder="Enter Custom File Name"
            onChange={(e) => setPdfFileName(e.target.value)}
          />
        </div>
        <div className="md:w-1/2 flex items-center justify-start">
          <button
            className="py-2 px-8 rounded-2xl bg-blue-500 text-white text-xl hover:bg-blue-700 duration-100 flex items-center justify-center gap-2 font-bold disabled:bg-gray-700"
            disabled={pdfFileName.length === 0}
            onClick={handlePdfConvert}
          >
            Convert to pdf
            <i className="fa-solid fa-download"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
