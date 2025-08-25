

import { dbConnect } from "@/service/mongoose";

import Navbar from "@/components/navbar/Navbar";
import { getAvatar } from "@/queries/avatar";
import { getSocialLinks } from "@/queries/social";
import { auth } from "@/auth";



export const metadata = {
  title: "Ruhul Amin | Project Details",

  keywords: "Ruhul Amin, Portfolio, Web Developer, Software Engineer, Full Stack Developer, Next.js, React.js, MongoDB, Express.js, Node.js",
  description: " Iam a passionate web developer skilled in JavaScript, React, and Next.js. I love crafting responsive, user-friendly interfaces with clean design and strong functionality. Let’s build something great together!",
};

export default async function ProjectDetailLayout({ children }) {
  await dbConnect();
   const avatarData = await getAvatar();
   const links =await getSocialLinks()
      const session = await auth();



  


  return (
    <html lang="en">
      <body
        className={` antialiased`}
      >
        <Navbar nav={false} links={links?.[0]} session={session}  avatarData={avatarData?.[0]}></Navbar>
       
 {children}

       
       
      </body>
    </html>
  )

 
}
