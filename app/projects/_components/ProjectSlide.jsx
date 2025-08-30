'use client';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import { useEffect } from "react";

export default function ProjectSlide({ images }) {
  // Custom CSS for Swiper navigation color
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      .swiper-button-next, .swiper-button-prev {
        color: #06b6d4; /* Tailwind cyan-400 */
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div className="border border-gray-700 w-full md:w-1/2 h-full rounded-lg overflow-hidden 
                    "> 
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        autoplay={{ delay: 2500, disableOnInteraction: false }}
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
    </div>
  );
}
