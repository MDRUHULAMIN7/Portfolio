'use client';

import { Menu, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export function SidebarWrapper({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
   
      <aside className={`
        fixed top-0 left-0 z-30 h-full w-64 bg-[#2c3e57] text-white p-4 transform 
        transition-transform duration-300 ease-in-out 
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <nav className="space-y-4">
          <Link href="/dashboard/overview" className="block hover:text-teal-400">Overview</Link>
          <Link href="/dashboard/projects" className="block hover:text-teal-400">Projects</Link>
          <Link href="/dashboard/analytics" className="block hover:text-teal-400">Analytics</Link>
          <Link href="/dashboard/settings" className="block hover:text-teal-400">Settings</Link>
        </nav>
      </aside>


      <button
        className="fixed lg:hidden top-4 right-4 z-40 text-white bg-[#2c3e57] p-2 rounded-full cursor-pointer"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Toggle sidebar"
      >
        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 " />}
      </button>

    
      <main className="flex-1 ml-0 lg:ml-64 bg-white text-black min-h-screen">
        {children}
      </main>
    </div>
  );
}
