"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Intro({ onFinish }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      onFinish && onFinish();
    }, 2500); 
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;




  return (
    <div className="fixed inset-0 z-50 bg-gray-800 flex flex-col justify-center items-center overflow-hidden">


      {[...Array(20)].map((_, i) => (
    <span
      key={i}
      className="star2"
      style={{
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animationDuration: `${Math.random() * 3 + 2}s`,
        animationDelay: `${Math.random() * 2}s`,
      }}
    >
      ★
    </span>
  ))}

     
      <motion.img
        src="/opengraph-image.png"
        alt="Logo"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 150, damping: 12, delay: 0.1, duration: 0.5 }}
        className="w-32 h-32 mb-4 z-10 rounded-full shadow-lg shadow-cyan-400/60"
      />

    
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="text-gray-300 text-lg md:text-xl z-10 mb-1 tracking-wide"
      >
        Welcome to my portfolio
      </motion.p>

      
      <motion.h1
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6, ease: "easeOut" }}
        className="text-white text-4xl md:text-5xl font-extrabold z-10 tracking-wide"
      >
        Md. Ruhul Amin
      </motion.h1>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="text-cyan-400 text-xl md:text-2xl mt-2 z-10 tracking-wide"
      >
        Frontend Developer
      </motion.p>

     
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: "60%", opacity: 1 }}
        transition={{ delay: 2.0, duration: 0.4 }}
        className="h-1 bg-gradient-to-r from-cyan-400 to-pink-400 rounded mt-3 z-10 shadow-lg"
      />

    </div>
  );
}
