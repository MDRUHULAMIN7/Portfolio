"use client";
import ModalWrapper from "@/components/ModalWrapper";
import { Clock8 } from "lucide-react";
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
  const sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 800px";

  return (
    <ModalWrapper isOpen={open} onClose={onClose}>
      <div className="p-2 sm:p-4 pt-6">
        {" "}
        <h2 className="text-xl font-semibold mb-4 mt-4 ">{blog.title}</h2>
        <div className="relative w-full h-56 sm:h-64 md:h-80">
          {!blog?.banner && (
            <div className="absolute inset-0 animate-pulse bg-gray-700 rounded-md" />
          )}
          {blog?.banner && (
            <Image
              src={blog.banner}
              alt={blog.title}
              fill
              sizes={sizes}
              className="object-cover rounded-md"
              priority={false}
            />
          )}
        </div>
        <p className="text-lg text-gray-900 bg-cyan-400 px-3 py-1 mt-3 w-fit rounded-lg mb-2">
          {blog.topic}
        </p>
        <p className="text-base flex items-center gap-x-2 text-gray-200 mb-2">
          <Clock8 size={16} /> {blog.readingTime} min
        </p>
        <p className="text-base text-gray-400 mb-2">
          {new Date(blog.createdAt).toDateString()}
        </p>
        <p
          className="mb-3 text-gray-300"
          dangerouslySetInnerHTML={{ __html: blog.description }}
        ></p>
      </div>
    </ModalWrapper>
  );
}
