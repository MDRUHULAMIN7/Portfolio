"use client";
import { Menu, X, LayoutDashboard, PlusSquare, BarChart2, Settings, SquareChartGantt, TextQuote, ChevronDown, ChevronUp, ShieldPlus, ImageUpIcon, RefreshCcwDot, BookOpenText, BriefcaseMedical, CodeXml, Library, LinkIcon, Mail } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/Logo/Logo";

export function DashboardSidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false); // dropdown state
  const pathname = usePathname();

  const navLinks = [
    { href: "/dashboard/overview", label: "Overview", icon: <LayoutDashboard className="w-5 h-5" /> },
    { href: "/dashboard/analytics", label: "Analytics", icon: <BarChart2 className="w-5 h-5" /> },
    { href: "/dashboard/projects", label: "Projects", icon: <SquareChartGantt className="w-5 h-5" /> },
    { href: "/dashboard/addprojects", label: "Add Projects", icon: <PlusSquare className="w-5 h-5" /> },
    { href: "/dashboard/messages", label: "Messages", icon: <Mail className="w-5 h-5" /> },
    { href: "/dashboard/testimonials", label: "Testimonials", icon: <TextQuote className="w-5 h-5" /> },
    { href: "/dashboard/addexperience", label: "Add Experience", icon: <BriefcaseMedical className="w-5 h-5" /> },
    { href: "/dashboard/skills", label: "Skills", icon: <CodeXml className="w-5 h-5" /> },
    { href: "/dashboard/course", label: "Course", icon: <Library className="w-5 h-5" /> },
    { href: "/dashboard/socials", label: "Socials", icon: <LinkIcon className="w-5 h-5" /> },
    { href: "/dashboard/blog", label: "Blog", icon: <BookOpenText className="w-5 h-5" /> },

  ];

  const settingsLinks = [
    { href: "/dashboard/settings/imageupload", label: "Image Upload",icon: <ImageUpIcon  className="w-5 h-5" /> },
    { href: "/dashboard/settings/updateresume", label: "Update Resume",icon: <RefreshCcwDot className="w-5 h-5" /> },
    { href: "/dashboard/settings/security", label: "Security",icon: <ShieldPlus className="w-5 h-5" /> },
    { href: "/dashboard/settings/permissions", label: "Permissions",icon: <ShieldPlus className="w-5 h-5" />  },
  ];

  return (
    <>
      {/* Sidebar */}
     <aside
  className={`fixed top-0 left-0 z-50 h-full w-[280px] bg-[#0d1622] shadow-2xl px-6 py-6 flex flex-col gap-8 text-white
    transform transition-transform duration-300 ease-in-out
    ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
    overflow-x-auto overflow-y-auto noscrollbar`}
>

        <div className="flex flex-col gap-2">
          <Logo />
          <h2 className="text-2xl font-semibold">Admin Dashboard</h2>
        </div>

        <nav className="flex flex-col gap-2 text-lg font-medium">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-colors 
                  ${isActive 
                    ? "bg-cyan-400 text-black font-semibold shadow-md" 
                    : "hover:bg-cyan-600/40 hover:text-cyan-300"}`}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            );
          })}

          {/* Settings Dropdown */}
          <div className="flex flex-col">
            <button
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
              className="flex items-center justify-between gap-3 px-4 py-2 rounded-xl hover:bg-cyan-600/40 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </div>
              {isSettingsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {isSettingsOpen && (
              <div className="flex flex-col ml-8 mt-2 gap-2">
                {settingsLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-cyan-500/40 transition-colors ${
                      pathname === link.href ? "bg-cyan-400 text-black font-semibold" : "text-gray-300"
                    }`}
                  >
                    {link.icon}

                    <span className="ml-2">{link.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>
      </aside>

      {/* Mobile toggle */}
      <button
        className="fixed top-4 right-4 z-50 lg:hidden text-cyan-400 bg-[#0d1622] p-2 rounded-full shadow-md cursor-pointer"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-md transition-opacity duration-500 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
}
