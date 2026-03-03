import { Geist, Geist_Mono } from "next/font/google";
import { Luckiest_Guy } from "next/font/google";
import "./globals.css";
import Script from "next/script";

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
    <html lang="en" data-dashboard="0">
      <head>
        <Script id="dashboard-flag" strategy="beforeInteractive">
          {`(function(){
             try{
               var isDash=false;
               try{isDash=location.pathname.indexOf('/dashboard')===0;}catch(e){}
               document.documentElement.dataset.dashboard = isDash?'1':'0';
             }catch(e){
               document.documentElement.dataset.dashboard='0';
             }
           })();`}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${luckiestGuy.variable} antialiased bg-[#203550]`}
      >
        <div id="site-shell">
          <div id="site-nav">
            <NavbarServer fallback={<Loader2 />} />
          </div>
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
