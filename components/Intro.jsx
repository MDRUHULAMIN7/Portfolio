"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Intro({ onFinish }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      onFinish && onFinish();
    }, 4000); // 4 seconds intro
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#1a1a1a] flex flex-col justify-center items-center">
      <motion.img
        src="/logo.png"
        alt="Logo"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1 }}
        className="w-32 h-32 mb-6"
      />
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="text-white text-4xl font-bold tracking-wide"
      >
        Your Name
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="text-gray-300 text-lg mt-2"
      >
        Complete Tech Solutions
      </motion.p>
    </div>
  );
}
