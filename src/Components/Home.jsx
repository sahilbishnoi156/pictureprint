import Link from "next/link";
import '@/styles/main.css'

export default function Home() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-white dark:bg-[#151515] text-black dark:text-white">
      <h1 className="text-[5vw] text-center mb-2" id="heading">PICTURE PRINT</h1>
      <p className="w-2/3 text-center">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse vitae
        animi quasi unde error, nostrum eaque porro minus inventore repudiandae
        similique voluptates reiciendis,
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
