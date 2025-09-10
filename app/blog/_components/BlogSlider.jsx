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
        autoplay={{ delay: 7000, disableOnInteraction: false }}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
        className="pb-14" 
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

    
      <style jsx global>{`
        .swiper-pagination {
          bottom: 10px !important; /* force it below the cards */
          text-align: center;
        }
        .swiper-pagination-bullet {
          width: 14px;
          height: 14px;
          background-color: #22d3ee; /* cyan-400 */
          opacity: 0.5;
        }
        .swiper-pagination-bullet-active {
          opacity: 1;
        }
      `}</style>
    </div>
  );
}
