"use client";
import { Menu, X, LayoutDashboard, PlusSquare, BarChart2, Settings } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/Logo/Logo";

export function DashboardSidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/dashboard/overview", label: "Overview", icon: <LayoutDashboard className="w-5 h-5" /> },
    { href: "/dashboard/addprojects", label: "Add Projects", icon: <PlusSquare className="w-5 h-5" /> },
    { href: "/dashboard/analytics", label: "Analytics", icon: <BarChart2 className="w-5 h-5" /> },
    { href: "/dashboard/settings", label: "Settings", icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-[280px] bg-[#0d1622] shadow-2xl px-6 py-6 flex flex-col gap-8 text-white
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
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
