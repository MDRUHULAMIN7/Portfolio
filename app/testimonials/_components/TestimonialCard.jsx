"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AiFillStar } from "react-icons/ai";
import CardWrapper from "@/components/CardWrapper";

const TestimonialCard = ({ testimonials }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  if (testimonials.length === 0) {
    return <div className="text-center text-white">No testimonials available</div>;
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-center space-y-12 md:space-y-0 space-x-6 lg:space-x-2  md:px-6 lg:px-12 py-4">
   
<div className="w-full md:w-1/2 xl:mt-14 relative flex  justify-center  items-center">
 
  <motion.div
    className="absolute h-98 w-72 md:w-100 rounded-xl bg-cyan-400 backdrop-blur-md shadow-xl"
    animate={{ rotate: [0, 2, -2, 0], scale: [1, 1.02, 0.98, 1] }}
    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
  />

 
  <motion.div
    className="relative h-80 w-60 md:w-84 z-30 overflow-hidden rounded-xl cursor-pointer"
    whileHover={{ scale: 1.05, rotateY: 5 }}
    animate={{ y: [0, -5, 0, 5, 0] }}
    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
  >
    <AnimatePresence mode="wait">
      <motion.div
        key={testimonials[activeIndex].avatar}
        initial={{ opacity: 0, x: -30, scale: 0.95 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: 30, scale: 0.95 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="absolute inset-0"
      >
        <Image
          src={testimonials[activeIndex].avatar}
          alt={testimonials[activeIndex].name}
          fill
          className="object-cover rounded-xl shadow-lg"
        />
      </motion.div>
    </AnimatePresence>
  </motion.div>
</div>






      {/* Right Side Testimonial Slider */}
      <div className="w-full md:w-1/2 mt-6 md:mt-0">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl pl-6 font-bold mb-8 text-start text-cyan-400 bg-clip-tex"
        >
          What People Say
        </motion.h2>

        <Swiper
          modules={[Navigation,Autoplay]}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
          spaceBetween={30}
          slidesPerView={1}
          className="pb-12"
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        >
          {testimonials?.map((testimonial, idx) => (
            <SwiperSlide key={idx}>
              <AnimatePresence mode="wait">
                 <div className="p-4 px-4">
                <CardWrapper>
            <div className="p-4 px-4">
                  {/* Testimonial Text */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-200 italic text-lg leading-relaxed"
                  >
                    “{testimonial.review}”
                  </motion.p>

                  {/* User Info */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-start gap-4"
                  >
                    <div className="flex flex-col items-start gap-y-1">
                      <p className="font-semibold text-cyan-400 text-lg">
                        {testimonial.name}
                      </p>
                      <p className="text-gray-300 flex gap-x-2 items-center">
                        {testimonial.role} at
                        <span className="text-gray-100 font-semibold">
                          {testimonial.company}
                        </span>
                      </p>

                      {/* Animated Stars */}
                      <div className="flex text-yellow-400 mt-2">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <motion.span
                            key={i}
                            animate={{ opacity: [0.6, 1, 0.6] }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: i * 0.3,
                            }}
                          >
                            <AiFillStar size={22} />
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  {/* Navigation */}
                  <div className="flex gap-4 mt-6 p-2">
                    <motion.button
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.95 }}
                      className="custom-prev w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/20 shadow-md flex items-center justify-center text-white hover:bg-white/30 transition"
                    >
                      <FaArrowLeft />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.95 }}
                      className="custom-next w-12 h-12 rounded-full bg-cyan-400 shadow-lg flex items-center justify-center text-white hover:opacity-90 transition"
                    >
                      <FaArrowRight />
                    </motion.button>
                  </div>
            </div>
                </CardWrapper>
                </div>
              </AnimatePresence>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TestimonialCard;
