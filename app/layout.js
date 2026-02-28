import { Geist, Geist_Mono } from "next/font/google";
import { Luckiest_Guy } from "next/font/google";
import "./globals.css";

import { Loader2 } from "lucide-react";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "@/components/ScrollToTop";
import NavbarServer from "@/components/navbar/NavbarServer";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const luckiestGuy = Luckiest_Guy({
  weight: "400",
  variable: "--font-luckiest-guy",
  subsets: ["latin"],
}); 

export const metadata = {
  title: "Ruhul Amin | Frontend Developer",
  keywords: "Ruhul Amin, Portfolio, Web Developer, Software Engineer, Full Stack Developer, Next.js, React.js, MongoDB, Express.js, Node.js",
  description: " Iam a passionate web developer skilled in JavaScript, React, and Next.js. I love crafting responsive, user-friendly interfaces with clean design and strong functionality. Let’s build something great together!",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${luckiestGuy.variable} antialiased bg-[#203550]`}
      >
        <NavbarServer fallback={<Loader2 />} />

       
 {children}

         <Toaster 
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              fontFamily: 'inherit',
              borderRadius: '8px',
              padding: '12px 16px',
            },
          }}
        />

        <ScrollToTop />

       
      </body>
    </html>
  )

}
