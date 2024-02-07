import "../styles/globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PictureFlow | Download your images ",
  description: "Download images on highest quality",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-white dark:bg-[#151515]">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className={`${inter.className} h-screen w-screen box-border`}>
        <div className="sticky top-0 left-0 w-full z-40">
          <Navbar />
        </div>
        <div>{children}</div>
      </body>
    </html>
  );
}
