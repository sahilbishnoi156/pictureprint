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
      <body className={inter.className}>
        {children}
        <script
          src="https://kit.fontawesome.com/f8f9825bbd.js"
          crossOrigin="anonymous"
        ></script>
      </body>
    </html>
  );
}
