"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

function Navs() {
  const [activeSection, setActiveSection] = useState("home");
  const pathname = usePathname();

  const links = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Blog", href: "#blog" },
    { name: "Contact", href: "#contact" },
  ];

  const handleClick = (e, href) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.pushState(null, "", href);

      setActiveSection(id);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      let current = "home";
      let minOffset = Infinity;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const offset = Math.abs(rect.top);

        if (offset < minOffset && rect.top < window.innerHeight) {
          minOffset = offset;
          current = section.id;
        }
      });

      setActiveSection(current);
    };

    const handlePopState = () => {
      const hash = window.location.hash.replace("#", "") || "home";
      setActiveSection(hash);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("popstate", handlePopState);

    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return (
    <ul className="flex flex-col xl:flex-row justify-center xl:items-center items-start h-full space-y-2 lg:space-y-0 text-lg lg:text-[16px] xl:space-x-3 lg:space-x-2 font-semibold text-white">
      {links.map(({ name, href }) => {
        const isActive = activeSection === href.replace("#", "");

        return (
          <li key={name} className="relative cursor-pointer">
            <a
              href={href}
              onClick={(e) => handleClick(e, href)}
              className={`relative px-3 py-2 transition-colors duration-300
                ${isActive ? "text-cyan-400" : "text-white hover:text-cyan-300"}
              `}
            >
              {name}
              <span
                className={`absolute left-1/2 bottom-1 h-[2px] w-0 transition-all duration-500
                  ${
                    isActive
                      ? "w-[80%] -translate-x-1/2 bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 shadow-md rounded-full"
                      : ""
                  }
                `}
              />
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export default Navs;
