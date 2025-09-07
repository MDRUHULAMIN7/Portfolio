"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";

export default function LoginButton({loginPermission}) {
  const [isOpen, setIsOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  const isAdmin = loggedInUser?.role === "admin";

  
  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const response = await fetch("/api/me", { cache: "no-store" });
        if (!response.ok) {
          setLoggedInUser(null);
          return;
        }
        const data = await response.json();
        setLoggedInUser(data);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
        setLoggedInUser(null);
      }
    };

    fetchLoggedInUser();
  }, []);

  const handleSignOut = () =>
    signOut({
      callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/login`,
    });

  return (
    <div className="relative">
      {loggedInUser ? (
        <div>
          {/* Avatar */}
          <div
            onClick={() => setIsOpen((prev) => !prev)}
            className="relative w-10 h-10 cursor-pointer rounded-full overflow-hidden group border-2 border-[#2c3e57] hover:border-blue-500 transition"
          >
            <span className="absolute inset-0 bg-gradient-to-tr from-cyan-400 via-sky-500 to-blue-500 rounded-full scale-0 transition-transform duration-700 ease-out group-hover:scale-100 z-0" />
            <Image
              src={loggedInUser.image || "/logo.png"}
              alt="User Avatar"
              fill
              className="rounded-full object-cover relative z-10"
            />
          </div>

          {/* Dropdown */}
          {isOpen && (
            <div className="absolute left-6 sm:-left-30   bottom-7 sm:-bottom-24   mt-2 w-40 bg-[#0d1622] text-white shadow-lg rounded-md z-50 overflow-hidden">
              {isAdmin && (
                <Link
                  href="/dashboard/overview"
                  className="block px-4 py-2 hover:text-cyan-400 transition"
                >
                  Dashboard
                </Link>
              )}
              <button
                onClick={handleSignOut}
                className="w-full text-left px-4 py-2 hover:text-cyan-400 transition"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      ) : (
        // Login Button
        loginPermission?.login && (

        <Link
          href="/login"
          className="relative h-10 px-4 inline-flex items-center justify-center text-white text-lg rounded-xl overflow-hidden group bg-white/10 hover:text-white"
        >
          <span className="absolute inset-0 bg-gradient-to-tr from-cyan-400 via-sky-500 to-blue-500 rounded-xl scale-0 transition-transform duration-700 ease-out group-hover:scale-100" />
          <span className="relative z-10">Login</span>
        </Link>)
      )}
    </div>
  );
}
