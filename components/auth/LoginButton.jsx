'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { signOut } from "next-auth/react";

function LoginButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    async function fetchMe() {
      try {
        const response = await fetch(`/api/me`);
        const data = await response.json();
        setLoggedInUser(data);
      } catch (e) {
        console.error(e);
      }
    }
    fetchMe();
  }, []);

  return (
    <div className="relative">
      {loggedInUser ? (
        <div className="relative">
     
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="relative w-[40px] h-[40px] cursor-pointer rounded-full overflow-hidden group border-2 border-[#2c3e57] hover:border-blue-500 bg-white/10 transition"
          >
  
            <span className="absolute inset-0 bg-gradient-to-tr from-cyan-400 via-sky-500 to-blue-500 rounded-full scale-0 transition-transform duration-700 ease-out origin-center group-hover:scale-100 z-[0]"></span>

            <Image
              src={loggedInUser?.image || '/logo.png'}
              alt="User Avatar"
              fill
              className="rounded-full object-cover relative z-10"
            />
          </div>

     
          {isOpen && (
            <div className="absolute left-14 sm:-left-36 sm:-bottom-24 bottom-10 mt-2 w-40 bg-[#0d1622] text-white shadow-lg rounded-md z-50 overflow-hidden">
              <Link
                href="/dashboard"
                className="block px-4 py-2 hover:text-cyan-400 transition duration-200"
              >
                Dashboard
              </Link>
              <button
                onClick={() => signOut({callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/login`})}
                className="w-full text-left px-4 py-2 hover:text-cyan-400 transition duration-200 cursor-pointer"
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
          target="_blank"
          className="relative h-10 text-white inline-flex items-center justify-center z-[1] px-4 rounded-xl text-lg overflow-hidden group bg-white/10 hover:text-white"
        >
          <span className="absolute inset-0 bg-gradient-to-tr from-cyan-400 via-sky-500 to-blue-500 rounded-xl scale-0 transition-transform duration-700 ease-out origin-center group-hover:scale-100"></span>
          <span className="relative z-10">LogIn</span>
        </Link>
      )}
    </div>
  );
}

export default LoginButton;
