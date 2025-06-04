
import { dbConnect } from "@/service/mongoose";
import DelayedContent from "../loading";
import { Geist, Geist_Mono } from "next/font/google";
import { Luckiest_Guy } from "next/font/google";
import { SidebarWrapper } from "./_components/SidebarWrapper";

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
  title: "Dashboard | Ruhul Amin",
  keywords: "Ruhul Amin, Portfolio, Web Developer, Software Engineer, Full Stack Developer, Next.js, React.js, MongoDB, Express.js, Node.js",
  description: " Iam a passionate web developer skilled in JavaScript, React, and Next.js. I love crafting responsive, user-friendly interfaces with clean design and strong functionality. Let’s build something great together!",
};

export default async function DashboardLayout({ children }) {
  await dbConnect();
   
  


  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${luckiestGuy.variable} antialiased`}
      >
       <SidebarWrapper>
        <DelayedContent>
 {children}

        </DelayedContent>
       </SidebarWrapper>
      </body>
    </html>
  );
}
