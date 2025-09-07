
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";
import Logo from "./Logo/Logo";
import { getSocialLinks } from "@/queries/social";
import Socials from "./Socials/Socials";

export default async function Footer() {
  const links =await getSocialLinks()
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 rounded-t-xl mx-2">
      <div className=" px-6 flex flex-col md:flex-row justify-between items-start md:items-center">
        
   
        <div className="mb-6 md:mb-0 text-center md:text-left">
          <Logo/>
          <a href="/" className="text-gray-400 hover:text-white transition">Frontend Developer | Portfolio</a>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col md:flex-row md:items-center items-start gap-6">
          <a href="#about" className="hover:text-white transition">About</a>
          <a href="#projects" className="hover:text-white transition">Projects</a>
          <a href="#contact" className="hover:text-white transition">Contact</a>
          <a href="#blog" className="hover:text-white transition">Blog</a>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-5 mt-6 md:mt-0">
          <Socials links={links[0]} />
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Ruhul Amin. All rights reserved.
      </div>
    </footer>
  );
}
