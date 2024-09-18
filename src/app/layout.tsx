import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/contexts/providers";
import NavBar from "@/components/navigation/navBar";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Coffee Culture",
  description: "Coffee bundle and loyalty service for independent coffee shops",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[var(--backgroundColour)] scroll-smooth`}>
      <Toaster/>
        <Providers>
          <NavBar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
