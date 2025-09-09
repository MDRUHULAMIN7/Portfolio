"use client";

import MetaDatas from "./MetaDatas";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function ProjectDetail({ project }) {
  if (!project) return null;

  const ProjectSlide = ({ images }) => {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const [loadedImages, setLoadedImages] = useState({});

    const handleImageLoad = (i) => {
      setLoadedImages((prev) => ({ ...prev, [i]: true }));
    };

    return (
      <div className="relative h-full rounded-lg overflow-hidden">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          className="rounded-lg h-full w-full"
        >
          {images?.map((img, i) => (
            <SwiperSlide key={i}>
              <div className="relative w-full h-full flex items-center justify-center bg-gray-800 rounded-lg">
                {/* Skeleton */}
                {!loadedImages[i] && (
                  <div className="w-full h-64 sm:h-80 md:h-[28rem] animate-pulse bg-gray-700 rounded-lg" />
                )}
                <img
                  src={img}
                  alt={`Project ${i + 1}`}
                  className={`rounded-lg shadow-md w-full h-full object-contain transition-opacity duration-500 ${
                    loadedImages[i] ? "opacity-100" : "opacity-0 absolute"
                  }`}
                  onLoad={() => handleImageLoad(i)}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Overlay navigation buttons */}
        <motion.button
          ref={prevRef}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
          className="absolute top-1/2 left-4 -translate-y-1/2 z-50 w-6 h-6 sm:w-10 sm:h-10 rounded-full bg-cyan-400 backdrop-blur-md border border-white/20 shadow-md flex items-center justify-center text-white hover:bg-white/30 transition"
        >
          <FaArrowLeft />
        </motion.button>

        <motion.button
          ref={nextRef}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
          className="absolute top-1/2 right-4 -translate-y-1/2 z-50 w-6 h-6 sm:w-10 sm:h-10 rounded-full bg-cyan-400 shadow-lg flex items-center justify-center text-white hover:opacity-90 transition"
        >
          <FaArrowRight />
        </motion.button>
      </div>
    );
  };

  return (
    <div className="pt-4 max-w-7xl mx-auto text-gray-300 rounded-2xl space-y-6">
      <div className="flex flex-col gap-3 sm:gap-6">
        {/* Slider */}
        <div className="w-full">
          <ProjectSlide images={project?.images} />
        </div>

        {/* Meta Info */}
        <MetaDatas meta={project.meta} links={project.links} projectId={project.id} />
      </div>

      {/* Title + Description */}
      <div className="space-y-4 sm:space-y-8">
        <div className="border-b border-gray-700 pb-6">
          <h1 className="text-2xl sm:text-4xl text-left md:text-5xl font-bold text-white mb-4 leading-tight">
            {project.title}
          </h1>
          <p
            className="sm:text-lg text-left text-gray-300 leading-relaxed max-w-4xl"
            dangerouslySetInnerHTML={{ __html: project.description }}
          />
        </div>

        {/* Hashtags */}
        {project.hashtags?.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-xl text-left font-semibold text-white">Tags</h3>
            <div className="flex flex-wrap gap-3">
              {project.hashtags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 text-sm font-medium text-cyan-400 border border-cyan-400/30 rounded-full hover:bg-cyan-400/10 hover:scale-105 transition-all duration-200 cursor-default"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Features */}
        <h2 className="text-2xl text-left md:text-3xl font-bold text-white border-b border-gray-700 pb-3">
          Features & Highlights
        </h2>
        {project.features?.length > 0 && (
          <div className="space-y-6">
            {project.features.map((featureGroup, i) => (
              <div key={i} className="space-y-4">
                <h3 className="text-base sm:text-xl text-left font-semibold text-cyan-400 capitalize">
                  For {featureGroup.group} :
                </h3>
                <ul className="space-y-3 ml-4">
                  {featureGroup.items.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-4 text-gray-300">
                      <span className="text-cyan-400 font-bold text-sm sm:text-base mt-0.5 flex-shrink-0">
                        {String(idx + 1).padStart(2, "0")}.
                      </span>
                      <span className="text-sm sm:text-base text-left leading-relaxed">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Tech Stack */}
        {project.techStack?.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl text-left md:text-3xl font-bold text-white border-b border-gray-700 pb-3">
              Technologies & Tools
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.techStack.map((tech, i) => (
                <div
                  key={tech._id || i}
                  className="p-4 border border-gray-700 rounded-lg hover:border-gray-600 transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-white text-base">
                      {tech.name || "Technology"}
                    </span>
                    <span className="text-cyan-400 font-medium">
                      {tech.value || "N/A"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
