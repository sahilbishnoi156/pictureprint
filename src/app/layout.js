import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PictureFlow | Download your images ",
  description: "Download images on highest quality",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} h-screen w-screen box-border`}>
        <div className="h-screen w-screen">{children}</div>
        <script
          src="https://kit.fontawesome.com/f8f9825bbd.js"
          crossOrigin="anonymous"
          as="script"
        ></script>
        <script src="https://cdn.tailwindcss.com"></script>
      </body>
    </html>
  );
}
