"use client";
import ShowImage from "@/Components/ShowImage";
import jsPDF from "jspdf";
import Link from "next/link";
import { useState } from "react";

export default function Page() {
  const [imageFiles, setImageFiles] = useState([]);
  const [showImagePreview, setShowImagePreview] = useState(false);
  const [pdfFileName, setPdfFileName] = useState("")
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
    <div className="h-screen w-screen flex items-center justify-evenly flex-col">
      <div className="flex w-full items-center justify-center gap-16">
        <Link href="/" className="text-2xl">
          &larr;
        </Link>
        <h2>Image to pdf</h2>
      </div>
      <div className="flex items-center justify-center w-3/4">
        <label
          htmlFor="dropzone-file"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
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
              <span className="font-semibold">Click to upload</span> or drag and
              drop
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
      <div className="w-3/4 text-white flex flex-col gap-6">
        <div>Uploaded Files:</div>
        {showImagePreview ? (
          <ShowImage
            showImagePreview={showImagePreview}
            setShowImagePreview={setShowImagePreview}
            image_url={imageLink}
          />
        ) : (
          <></>
        )}
        <ol type="1" className="list-decimal">
          {imageFiles.map((file) => {
            return (
              <li key={file.name} id={file.name}>
                <button onClick={handleLinkClick}>{file.name}</button>
              </li>
            );
          })}
        </ol>
      </div>
      <div className="w-3/4 flex gap-4 items-center justify-between">
        <div className="w-1/2 flex gap-4 items-center justify-start">
        File Name :<input type="text" className="rounded-full p-2 text-black w-4/5" value={pdfFileName} onChange={e=>setPdfFileName(e.target.value)} /> 
        </div>
        <button
          className="p-2 px-4 bg-white rounded-full text-black text-2xl hover:scale-110 transition-all"
          onClick={handlePdfConvert}
        >
          Convert to pdf
        </button>
      </div>
    </div>
  );
}
