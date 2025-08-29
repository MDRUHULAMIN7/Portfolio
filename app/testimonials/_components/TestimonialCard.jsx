"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { AiFillStar } from "react-icons/ai";

const TestimonialCard = ({ testimonials }) => {
      const [activeIndex, setActiveIndex] = useState(0);
    
  return (
 <div className="flex flex-col md:flex-row items-center justify-center space-y-12 md:space-y-0 md:space-x-12 px-2 md:px-12">
      {/* Left Side Image */}
   
<div className="w-full md:w-1/2 relative flex justify-center items-center">
 
  <motion.div
    className="absolute h-100 w-82 lg:w-100 rounded-xl bg-cyan-400 backdrop-blur-md shadow-xl"
    animate={{ rotate: [0, 2, -2, 0], scale: [1, 1.02, 0.98, 1] }}
    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
  />

 
  <motion.div
    className="relative h-86 w-72 lg:w-84 z-30 overflow-hidden rounded-xl cursor-pointer"
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
      <div className="w-full md:w-1/2 mt-6 md:mt-0  ">
        <h2 className="text-3xl font-bold mb-6 text-start">What People Say</h2>

        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          spaceBetween={30}
          slidesPerView={1}
          className="pb-12"
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        >
          {testimonials?.map((testimonial, idx) => (
            <SwiperSlide key={idx}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={testimonial.text}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="flex flex-col gap-6"
                >
                  <motion.p
                    className="text-gray-400 italic text-lg leading-relaxed"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    “{testimonial.text}”
                  </motion.p>

                  <motion.div
                    className="flex items-start gap-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                  
                    <div className="flex flex-col items-start gap-y-1">

                      <p className="font-semibold text-cyan-400">{testimonial.name}</p>
                      <p className=" text-gray-300 flex justify-center gap-x-2 items-center">{testimonial.role} at   <p className=" text-gray-100 font-semibold"> {testimonial.company}</p></p>
                    
                      <div className="flex text-yellow-400">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <span key={i}><AiFillStar size={20} /></span>


                        ))}
                      </div>
                    </div>
                  </motion.div>

                  {/* Custom Navigation */}
                  <div className="flex gap-4 lg:mt-4  p-2 sm:p-4 ">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="custom-prev w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                      <FaArrowLeft />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="custom-next w-12 h-12 rounded-full bg-cyan-400 shadow-md flex items-center justify-center text-white hover:bg-cyan-600 transition-colors"
                    >
                      <FaArrowRight />
                    </motion.button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default TestimonialCard