import { Geist, Geist_Mono } from "next/font/google";
import { Luckiest_Guy } from "next/font/google";
import "./globals.css";

import { dbConnect } from "@/service/mongoose";

import Navbar from "@/components/navbar/Navbar";
import { getAvatar } from "@/queries/avatar";
import { getSocialLinks } from "@/queries/social";
import { auth } from "@/auth";
import { Loader2 } from "lucide-react";
import { Toaster } from "react-hot-toast";


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
  await dbConnect();
   const avatarData = await getAvatar();
   const links =await getSocialLinks()
      const session = await auth();


 if (!links || !avatarData) return <Loader2 />;

  


  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${luckiestGuy.variable} antialiased`}
      >
        <Navbar nav={true} links={links?.[0]} session={session}  avatarData={avatarData?.[0]}></Navbar>
       
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
       
      </body>
    </html>
  )

 
}
