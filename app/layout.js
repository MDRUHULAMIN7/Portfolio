import { Geist, Geist_Mono } from "next/font/google";
import { Luckiest_Guy } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import Intro from "@/components/Intro";

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
    <html lang="en" data-intro="1">
      <head>
        <Script id="intro-flag" strategy="beforeInteractive">
          {`(function(){try{var k='intro_seen_v3';var seen=false;try{seen=localStorage.getItem(k)==='1';}catch(e){}if(!seen){var m=document.cookie.match(new RegExp('(?:^|; )'+k+'=([^;]*)'));if(m&&m[1]==='1'){seen=true;}}document.documentElement.dataset.intro=seen?'0':'1';}catch(e){document.documentElement.dataset.intro='1';}})();`}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${luckiestGuy.variable} antialiased bg-[#203550]`}
      >
        <Intro />
        <div id="site-shell">
          <NavbarServer fallback={<Loader2 />} />
          {children}
        </div>

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