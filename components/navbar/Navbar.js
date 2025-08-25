"use client";

import { useEffect, useState } from "react";
import { HiOutlineX } from "react-icons/hi";
import { VscThreeBars } from "react-icons/vsc";
import Logo from "../Logo/Logo";
import Navs from "../Navs/Navs";
import Socials from "../Socials/Socials";
import Sidebar from "../Sidebar/Sidebar";

function Navbar({ avatarData, links, session,nav }) {
  const [scrolled, setScrolled] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [animateSidebar, setAnimateSidebar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  console.log(session, "session in navbar");

  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  const toggleSidebar = () => {
    if (sidebarOpen) {
      setAnimateSidebar(false);
      setTimeout(() => setSidebarOpen(false), 300);
    } else {
      setSidebarOpen(true);
      setTimeout(() => setAnimateSidebar(true), 20);
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 px-10 xl:px-16 w-full h-16 z-50">
        <div
          className={`absolute inset-0 transition-all duration-500 ease-in-out pointer-events-none transform ${
            scrolled
              ? "translate-y-0 bg-[#0d1622] shadow-md"
              : "-translate-y-full bg-transparent shadow-none"
          }`}
        />

        <div className="relative flex justify-between items-center h-full ">
          <Logo />

         {nav && <div className="hidden xl:flex">
            <Navs />
          </div>}

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex">
              <Socials session={session} links={links} />
            </div>

            <button
              onClick={toggleSidebar}
              className="xl:hidden text-cyan-400 cursor-pointer text-3xl transition-transform duration-300 ease-in-out"
            >
              <div
                className={`transition-transform duration-400 ease-in-out transform ${
                  sidebarOpen ? "rotate-[90deg]" : "rotate-0"
                }`}
                style={{
                  display: "inline-block",
                }}
              >
                {sidebarOpen ? <HiOutlineX /> : <VscThreeBars />}
              </div>
            </button>
          </div>
        </div>
      </div>

      {sidebarOpen && (
        <>
          <div
            className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-md transition-opacity duration-500  ${
              animateSidebar ? "opacity-100" : "opacity-0"
            }`}
            onClick={toggleSidebar}
          ></div>

          <Sidebar
            nav={nav}

            links={links}
            session={session}
            avatarData={avatarData}
            toggleSidebar={toggleSidebar}
            animateSidebar={animateSidebar}
          ></Sidebar>
        </>
      )}
    </>
  );
}

export default Navbar;
