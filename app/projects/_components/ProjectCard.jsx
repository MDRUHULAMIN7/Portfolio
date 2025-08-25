'use client';
import AccentData from '@/components/buttons/AccentData';
import CardWrapper from '@/components/CardWrapper';
import { Heart } from 'lucide-react';
import Link from 'next/link';


export default function ProjectCard({ project }) {
  return (
    <Link href={`/projects/${project?.id}`} className="block no-underline">
      <CardWrapper hoverGradient="rgba(59,130,246,0.2)" className="p-4">

        {/* Image */}
        <div className="relative w-full h-56 overflow-hidden rounded-2xl">
          <img
            src={project.images[0]}
            alt={project.title}
            className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent rounded-2xl" />
        </div>

        {/* Content */}
        <div className="flex flex-col flex-grow p-5">
          {/* Title + Type */}
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-2xl font-bold text-white tracking-wide  transition">
              {project?.title}
            </h2>
          <AccentData>
              {project.meta.type}
            </AccentData>
          </div>

          {/* Description */}
          <p className="text-gray-400 text-sm mb-4 line-clamp-4 leading-relaxed">
            {project?.description}
          </p>

          {/* Dates */}
          <div className="flex flex-wrap gap-2 text-xs text-gray-300">
             <AccentData>
              {new Date(project?.meta?.startDate).toLocaleDateString()} -{' '}
              {new Date(project.meta.endDate).toLocaleDateString()}
              </AccentData>
          </div>

          {/* Hashtags */}
          {project?.hashtags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {project?.hashtags?.map((tag, idx) => (
                <span
                  key={idx}
                  className=" hover:scale-105 transition"
                >
                  <AccentData>
                    #{tag}
                  </AccentData>
                </span>
              ))}
            </div>
          )}

          {/* Likes */}
          <div className="mt-6 flex items-center justify-between">
            <span className="flex items-center gap-2 text-cyan-400 transition">
              <Heart className="w-5 h-5 group-hover:scale-110 transition" />
              <span className="font-medium">{project?.meta?.loves}</span>
            </span>
            <span className="text-xs text-cyan-500 italic">
              Click card for details →
            </span>
          </div>
        </div>
      </CardWrapper>
    </Link>
  );
}
