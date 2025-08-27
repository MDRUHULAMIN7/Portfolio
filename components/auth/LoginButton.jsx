"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";

// Helpers
const fetchLoggedInUser = async (setUser) => {
  try {
    const response = await fetch("/api/me");
    if (!response.ok) {
      const text = await response.text();
      if (text.includes("not authenticated")) {
        console.log("User is not authenticated");
        setUser(null);
        return;
      }
      throw new Error(`Fetch error: ${text}`);
    }
    const data = await response.json();
    setUser(data);
  } catch (error) {
    console.error("Failed to fetch user info:", error);
  }
};

function LoginButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  const isAdmin = loggedInUser?.role === "admin";
  console.log(isAdmin,loggedInUser?.email)

  const loginPermission = true;

  useEffect(() => {
    fetchLoggedInUser(setLoggedInUser);
  }, []);

  const handleAvatarClick = () => setIsOpen((prev) => !prev);

  const handleSignOut = () =>
    signOut({
      callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/login`,
    });

  if (!loginPermission ) return null ;

  return (
    <div className="relative">
      {loggedInUser ? (
        <div className="relative">
          {/* Avatar */}
          <div
            onClick={handleAvatarClick}
            className="relative w-10 h-10 cursor-pointer rounded-full overflow-hidden group border-2 border-[#2c3e57] hover:border-blue-500 bg-white/10 transition"
          >
            <span className="absolute inset-0 bg-gradient-to-tr from-cyan-400 via-sky-500 to-blue-500 rounded-full scale-0 transition-transform duration-700 ease-out origin-center group-hover:scale-100 z-0" />
            <Image
              src={loggedInUser.image || "/logo.png"}
              alt="User Avatar"
              fill
              className="rounded-full object-cover relative z-10"
            />
          </div>

          {/* Dropdown */}
          {isOpen && (
            <div className="absolute left-14 sm:-left-36 sm:-bottom-24 bottom-10 mt-2 w-40 bg-[#0d1622] text-white shadow-lg rounded-md z-50 overflow-hidden">
              {isAdmin && (
                <Link
                  href="/dashboard"
                  className="block px-4 py-2 hover:text-cyan-400 transition duration-200"
                >
                  Dashboard
                </Link>
              )}
              <button
                onClick={handleSignOut}
                className="w-full text-left px-4 py-2 hover:text-cyan-400 transition duration-200"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      ) : (
        // Login Button
        <Link
          href="/login"
          className="relative h-10 text-white inline-flex items-center justify-center z-[1] px-4 rounded-xl text-lg overflow-hidden group bg-white/10 hover:text-white"
        >
          <span className="absolute inset-0 bg-gradient-to-tr from-cyan-400 via-sky-500 to-blue-500 rounded-xl scale-0 transition-transform duration-700 ease-out origin-center group-hover:scale-100" />
          <span className="relative z-10">LogIn</span>
        </Link>
      )}
    </div>
  );
}

export default LoginButton;
