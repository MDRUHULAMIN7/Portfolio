"use client";
import CardWrapper from "@/components/CardWrapper";
import Image from "next/image";

export default function BlogCard({ blog, setOpen, setSelectedBlog }) {
  return (
    <CardWrapper>
      <div
        onClick={() => {
          setSelectedBlog(blog);
          setOpen(true);
        }}
        className="cursor-pointer"
      >
        {/* Banner */}
        <div className="relative w-full h-50">
          <Image
            src={blog.banner}
            alt={blog.title}
            fill
            className="object-cover rounded-t-md"
          />
        </div>

        {/* Content */}
        <div className="p-4 space-y-2">
          <h3 className="font-semibold text-lg line-clamp-1">{blog.title}</h3>
          <p className="text-sm text-gray-700 bg-cyan-400 px-3 py-1 rounded-full w-fit">
            {blog.topic}
          </p>
          <p className="text-xs text-gray-400">
            {new Date(blog.createdAt).toDateString()}
          </p>
          <p className="text-sm text-gray-500 line-clamp-4"   dangerouslySetInnerHTML={{ __html: blog.description }}>
        
          </p>
          <span className="block text-cyan-400 text-xs">Read More...</span>
        </div>
      </div>
    </CardWrapper>
  );
}
