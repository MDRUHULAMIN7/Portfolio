"use client";

import { Heart } from "lucide-react";
import Link from "next/link";

export default function ProjectCard({ project }) {
  return (
    <Link href={`/projects/${project?.id}`} className="block no-underline">
      <div className="bg-[#1a1a1a]/95 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border border-gray-800 hover:shadow-cyan-500/20 hover:-translate-y-2 transition-all duration-300 flex flex-col cursor-pointer group">
        
        {/* Image */}
        <div className="relative w-full h-56 overflow-hidden">
          <img
            src={project.images[0]}
            alt={project.title}
            className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>

        {/* Content */}
        <div className="flex flex-col flex-grow p-5">
          {/* Title + Type */}
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-2xl font-bold text-white tracking-wide group-hover:text-cyan-400 transition">
              {project?.title}
            </h2>
            <p className="px-3 py-1 bg-cyan-400 text-[#1a1a1a] font-semibold text-xs rounded-full shadow-sm">
              {project.meta.type}
            </p>
          </div>

          {/* Description */}
          <p className="text-gray-400 text-sm mb-4 line-clamp-4 leading-relaxed">
            {project?.description}
          </p>

          {/* Divider */}
          <div className="border-t border-gray-700/50 my-3" />

      
          <div className="flex flex-wrap gap-2 text-xs text-gray-300">
            <p className="px-3 py-1  font-semibold  text-[#1a1a1a] rounded-2xl border bg-cyan-400">
              {new Date(project?.meta?.startDate).toLocaleDateString()} -{" "}
              {new Date(project.meta.endDate).toLocaleDateString()}
            </p>
          </div>

       
          {project?.hashtags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {project?.hashtags?.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 text-xs bg-cyan-400 text-[#1a1a1a] font-medium rounded-full shadow-sm hover:scale-105 transition"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

        
          <div className="mt-6 flex items-center justify-between">
            <span className="flex items-center gap-2 text-cyan-400  transition">
              <Heart className="w-5 h-5 group-hover:scale-110 transition" />
              <span className="font-medium">{project?.meta?.likes}</span>
            </span>
            <span className="text-xs text-cyan-500 italic">
              Click card for details →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
