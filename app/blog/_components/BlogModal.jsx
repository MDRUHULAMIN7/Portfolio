"use client";
import ModalWrapper from "@/components/ModalWrapper";
import Image from "next/image";
import { useEffect } from "react";


export default function BlogModal({ open, onClose, blog }) {
      useEffect(() => {
        if (open) {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = "auto";
        }
    
    
        return () => {
          document.body.style.overflow = "auto";
        };
      }, [open]);
  if (!blog) return null;

  return (
    <ModalWrapper isOpen={open} onClose={onClose}>
    
      <h2 className="text-xl font-semibold mb-4">{blog.title}</h2>

   
      <div className="relative w-full h-60 mb-4">
        <Image
          src={blog.banner}
          alt={blog.title}
          fill
          className="object-cover rounded-md"
        />
      </div>

    
      <p className="text-lg text-gray-200 mb-2">

        {blog.topic} 
      </p>
      <p className="text-base text-gray-200 mb-2">
         {blog.readingTime} •{" "}
        {new Date(blog.createdAt).toDateString()}
      </p>

      <p className="mb-3 text-gray-200">{blog.description}</p>

    </ModalWrapper>
  );
}
