'use client';

import { Menu, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export function SidebarWrapper({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="relative flex min-h-screen">

      {/* Mobile overlay when sidebar is open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-md transition-opacity duration-500 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-[280px] bg-[#0d1622] shadow-2xl px-6 py-6 flex flex-col gap-8 text-white
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Header (logo & close) */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Dashboard</h2>
          
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-4 text-lg font-medium">
          <Link href="/dashboard/overview" className="hover:text-teal-400">Overview</Link>
          <Link href="/dashboard/projects" className="hover:text-teal-400">Projects</Link>
          <Link href="/dashboard/analytics" className="hover:text-teal-400">Analytics</Link>
          <Link href="/dashboard/settings" className="hover:text-teal-400">Settings</Link>
        </nav>
      </aside>

      {/* Toggle Button */}
      <button
        className="fixed top-4 right-4 z-50 lg:hidden text-cyan-400 bg-[#0d1622] p-2 rounded-full shadow-md cursor-pointer"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Toggle sidebar"
      >
        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Main content */}
      <main className="flex-1 ml-0 lg:ml-[280px] bg-white text-black min-h-screen">
        {children}
      </main>
    </div>
  );
}
