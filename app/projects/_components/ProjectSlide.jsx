'use client';

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import { useRef } from "react";
import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function ProjectSlide({ images }) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="relative border border-gray-700  h-full rounded-lg overflow-hidden">
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        className="rounded-lg h-full"
      >
        {images?.map((img, i) => (
          <SwiperSlide key={i}>
            <img
              src={img}
              alt={`Project ${i + 1}`}
              className="rounded-lg shadow-md w-full h-full object-contain"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Overlay navigation buttons */}
      <motion.button
        ref={prevRef}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
        className="absolute top-1/2 left-4 -translate-y-1/2 z-50 w-10 h-10 rounded-full bg-cyan-400  backdrop-blur-md border border-white/20 shadow-md flex items-center justify-center text-white hover:bg-white/30 transition"
      >
        <FaArrowLeft />
      </motion.button>

      <motion.button
        ref={nextRef}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
        className="absolute top-1/2 right-4 -translate-y-1/2 z-50 w-10 h-10 rounded-full bg-cyan-400 shadow-lg flex items-center justify-center text-white hover:opacity-90 transition"
      >
        <FaArrowRight />
      </motion.button>
    </div>
  );
}
