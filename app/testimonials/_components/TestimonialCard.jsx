"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  EffectCoverflow,
  Autoplay,
  Pagination,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import Image from "next/image";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { AiFillStar } from "react-icons/ai";
import CardWrapper from "@/components/CardWrapper";
import { useMemo } from "react";

// Helper function to truncate text to max 6 lines at '.' or '!'
function truncateReview(text, wordsPerLine = 10, maxLines = 5) {
  const words = text.split(" ");
  let truncated = "";
  let lineCount = 0;

  for (let i = 0; i < words.length; i += wordsPerLine) {
    lineCount++;
    let lineWords = words.slice(i, i + wordsPerLine).join(" ");
    truncated += lineWords + " ";

    if (lineCount === maxLines) {
      const lastStop = Math.max(
        lineWords.lastIndexOf("."),
        lineWords.lastIndexOf("!")
      );
      if (lastStop !== -1) {
        truncated = truncated.slice(
          0,
          truncated.length - (lineWords.length - lastStop) + 1
        );
      }
      break;
    }
  }

  return truncated.trim();
}

const TestimonialCard = ({ testimonials }) => {
  if (!testimonials || testimonials.length === 0) {
    return (
      <div className="text-center text-white">No testimonials available</div>
    );
  }

  return (
    <div className="relative w-full pb-2">
      <div className="flex items-center justify-end px-4 md:px-12 mb-8">
        <div className="hidden md:flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="custom-prev w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur border border-white/10 shadow-md flex items-center justify-center text-white transition pointer-events-auto"
            aria-label="Previous testimonial"
          >
            <FaArrowLeft />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="custom-next w-10 h-10 md:w-12 md:h-12 rounded-full bg-cyan-400 shadow-lg flex items-center justify-center text-white transition pointer-events-auto"
            aria-label="Next testimonial"
          >
            <FaArrowRight />
          </motion.button>
        </div>
      </div>

      <Swiper
        modules={[Navigation, EffectCoverflow, Autoplay, Pagination]}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        spaceBetween={30}
        speed={400}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 140,
          modifier: 2,
          slideShadows: false,
        }}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        pagination={{
          el: ".custom-pagination",
          clickable: true,
        }}
        className="pb-8"
        breakpoints={{
          0: { slidesPerView: 1.05 },
          640: { slidesPerView: 1.2 },
          1024: { slidesPerView: 2.5 },
        }}
        onSwiper={(swiper) => {
          try {
            swiper.params.navigation.prevEl = ".custom-prev";
            swiper.params.navigation.nextEl = ".custom-next";
            swiper.params.pagination.el = ".custom-pagination";
            swiper.navigation.init();
            swiper.navigation.update();
            swiper.pagination.init();
            swiper.pagination.update();
          } catch (e) {}
        }}
      >
        {testimonials.map((testimonial, idx) => {
          // Memoize truncated review to avoid recalculation
          const shortReview = useMemo(
            () => truncateReview(testimonial.review),
            [testimonial.review]
          );

          return (
            <SwiperSlide key={idx}>
              <CardWrapper>
                <div className="flex flex-col md:flex-row items-center gap-6 p-6">
                  <div className="flex flex-col items-center md:items-start gap-3 w-full md:w-1/3">
                    <div className="relative w-20 h-20 rounded-full overflow-hidden shadow-lg">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="text-center md:text-left">
                      <p className="font-semibold text-cyan-400 text-lg">
                        {testimonial.name}
                      </p>
                      <p className="text-gray-300 text-sm">
                        {testimonial.role} at{" "}
                        <span className="text-gray-100 font-semibold">
                          {testimonial.company}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between w-full md:w-2/3">
                    <motion.p
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="text-gray-200 italic text-sm lg:text-base leading-relaxed"
                    >
                      “{shortReview}”
                    </motion.p>

                    <div className="flex text-yellow-400 mt-4">
                      {Array.from({ length: testimonial.rating }).map(
                        (_, i) => (
                          <motion.span
                            key={i}
                            animate={{ opacity: [0.6, 1, 0.6] }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: i * 0.25,
                            }}
                            className="mr-1"
                          >
                            <AiFillStar size={20} />
                          </motion.span>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </CardWrapper>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Dotted pagination - visible on md and up */}
      <div className="custom-pagination mt-6 flex md:hidden justify-center gap-2" />

      {/* Optional small style tweaks for bullets (global style) */}
      <style jsx global>{`
        .custom-pagination .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.45);
          width: 10px;
          height: 10px;
          opacity: 1;
          transition: transform 220ms ease, background 220ms ease;
        }
        .custom-pagination .swiper-pagination-bullet-active {
          background: #06b6d4;
          transform: scale(1.25);
        }
      `}</style>
    </div>
  );
};

export default TestimonialCard;
