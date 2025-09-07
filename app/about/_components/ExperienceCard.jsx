"use client";
import { useState } from "react";
import Image from "next/image";
import CardWrapper from "@/components/CardWrapper";
import ExperienceModal from "../../../components/ExperienceModal"; // import modal

export default function ExperienceCard({ experiences }) {
  const [selectedExp, setSelectedExp] = useState(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2">
        {experiences.map((exp) => (
          <CardWrapper key={exp.id} className="relative">
         
            <div className="flex items-center gap-x-2 sm:gap-4 p-2 sm:p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="w-20 h-20 rounded-full border-2 border-gray-500 shadow-md overflow-hidden flex-shrink-0">
                <Image
                  src={exp.logo}
                  alt={exp.company}
                  width={56}
                  height={56}
                  className="object-cover rounded-full mx-auto p-2"
                />
              </div>
              <div>
                <h2 className="font-bold text-left sm:text-lg text-gray-900 dark:text-white">
                  {exp.designation}
                </h2>
                <p className="text-left text-gray-500 dark:text-gray-300 text-sm">
                  {exp.company} · <span className="italic">{exp.type}</span>
                </p>
              </div>
            </div>

            {/* Body */}
            <div className="px-6 py-4 text-left">
              <span
                className={`inline-block px-3 py-1 text-xs rounded-full font-medium mb-3
                  ${
                    exp.status === "Ongoing"
                      ? "bg-cyan-400 text-gray-800"
                      : exp.status === "Completed"
                      ? "bg-green-400 text-white"
                      : "bg-red-400 text-white"
                  }`}
              >
                {exp.status}
              </span>

              <div className="text-gray-400 text-xs mb-3">
                {new Date(exp.startDate).toLocaleDateString()} –{" "}
                {exp.endDate
                  ? new Date(exp.endDate).toLocaleDateString()
                  : "Present"}
              </div>

              <p className="text-gray-700 dark:text-gray-200 text-sm leading-relaxed mb-4">
                {exp.opinion}
              </p>

              <div className="flex justify-end">
                <button
                  onClick={() => setSelectedExp(exp)}
                  className="px-4 py-2 text-cyan-400 text-sm hover:text-cyan-600 transition"
                >
                  Explore More
                </button>
              </div>
            </div>
          </CardWrapper>
        ))}
      </div>

      {/* Modal Component */}
      <ExperienceModal exp={selectedExp} onClose={() => setSelectedExp(null)} />
    </>
  );
}
