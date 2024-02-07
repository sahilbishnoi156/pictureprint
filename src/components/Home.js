import Link from "next/link";
import '@/styles/main.css'

export default function Home() {
  return (
    <div className=" flex flex-col items-center justify-center bg-white dark:bg-[#151515] text-black dark:text-white md:py-40 py-12">
      <h1 className="text-[10vw] text-center mb-2 md:text-[5vw]" id="heading">PICTURE PRINT</h1>
      <p className="w-2/3 text-center">
      Unlock the power of image customization with Picture Print. 
      Download high-quality images and craft stunning PDFs, 
      all in one place. Your creative journey starts here!
      </p>
      <Link
        href={"/image_to_pdf"}
        className="mt-12 py-2 px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-700 hover:scale-105 duration-100 group"
      >
        Explore <i className="fa-solid fa-arrow-right-long ml-2 group-hover:rotate-180 duration-200"></i>
      </Link>
    </div>
  );
}
