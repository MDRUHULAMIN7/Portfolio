"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import CardWrapper from "@/components/CardWrapper";

export default function ExperienceCard({ experiences }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

      {experiences.map((exp) => (
        <div
          key={exp.id}
          className=""
        >
            <CardWrapper>
          {/* Images on top */}
          {exp.images.length > 0 && (
            <div className="relative h-56">
              <Swiper
                modules={[Navigation, Autoplay]}
                navigation
                autoplay={{ delay: 4000 }}
                loop
                className="h-full w-full"
              >
                {exp.images.map((img, idx) => (
                  <SwiperSlide key={idx}>
                    <Image
                      src={img}
                      alt={`Experience image ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              {/* Company Logo overlapping */}
              <div className="absolute  left-4 w-16 h-16 rounded-full overflow-hidden border-4 border-gray-900 shadow-lg">
                <Image
                  src={exp.logo}
                  alt={exp.company}
                  width={64}
                  height={64}
                  className="object-cover"
                />
              </div>
            </div>
          )}

          {/* Info Section */}
          <div className="pt-12 px-4 pb-4">
            <h2 className="font-bold text-lg">{exp.designation}</h2>
            <p className="text-gray-300 mb-2">{exp.company}</p>

            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-400">{exp.type}</span>
              <span
                className={`text-sm font-semibold ${
                  exp.status === "Ongoing"
                    ? "text-green-400"
                    : exp.status === "Completed"
                    ? "text-blue-400"
                    : "text-red-400"
                }`}
              >
                {exp.status}
              </span>
            </div>

            <div className="text-sm text-gray-400 mb-2">
              {new Date(exp.startDate).toLocaleDateString()} -{" "}
              {exp.endDate
                ? new Date(exp.endDate).toLocaleDateString()
                : "Present"}
            </div>

            <p className="text-gray-200">{exp.opinion}</p>
          </div>
            </CardWrapper>

        </div>
      ))}
    </div>
  );
}
