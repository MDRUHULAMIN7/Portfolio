"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import BlogCard from "./BlogCard";
import BlogModal from "./BlogModal";

export default function BlogSlider({ blogs }) {
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {/* Swiper */}
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={20}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet !bg-cyan-400 opacity-50",
          bulletActiveClass: "swiper-pagination-bullet-active !bg-cyan-400 opacity-100",
        }}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
        className="pb-10" 
      >
        {blogs.map((blog) => (
          <SwiperSlide key={blog.id}>
            <BlogCard
              blog={blog}
              setOpen={setOpen}
              setSelectedBlog={setSelectedBlog}
              onClick={() => setSelectedBlog(blog)}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Modal */}
      <BlogModal open={open} onClose={() => setOpen(false)} blog={selectedBlog} />
    </div>
  );
}
