'use client';

import AccentData from '@/components/buttons/AccentData';
import CardWrapper from '@/components/CardWrapper';
import { Heart } from 'lucide-react';
import { useState } from 'react';
import ProjectDetailModal from './ProjectDetailModal';
import Image from 'next/image';

export default function ProjectCard({ project }) {
  const [detailsModal, setDetailsModal] = useState(false);
  const isNew =
    project?.createdAt &&
    Date.now() - new Date(project.createdAt).getTime() < 1000 * 60 * 60 * 24 * 7;

  return (
    <>
      {/* Card */}
      <div
        onClick={() => setDetailsModal(true)}
        className=" cursor-pointer"
      >
        <CardWrapper hoverGradient="rgba(59,130,246,0.2)" className="">
         
       
<div className="relative w-full  overflow-hidden rounded-t-md bg-gray-800">
          {isNew && (
            <span className="absolute top-2 left-2 z-10 px-2 py-1 rounded-full text-xs font-semibold bg-cyan-400 text-black shadow">
              New
            </span>
          )}
          <Image
            src={project.images[0]}
            alt={`${project.title} project thumbnail`}
            height={700}
            width={500}
            sizes="(max-width: 640px) 100vw, (max-width: 1124px) 50vw, (max-width: 1280px) 33vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQ3NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
          />
        </div>

          
          <div className="flex flex-col flex-grow p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-bold text-white">{project?.title}</h2>
              <AccentData>{project.meta.type}</AccentData>
            </div>

            <p className="text-gray-400 text-left text-sm mb-4 line-clamp-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: project.description }}>
             
            </p>

            <div className="flex flex-wrap gap-2 text-xs text-gray-300">
              <AccentData>
                {new Date(project?.meta?.startDate).toLocaleDateString()} –{' '}
                {new Date(project.meta.endDate).toLocaleDateString()}
              </AccentData>
            </div>

            {project?.hashtags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {project.hashtags.map((tag, idx) => (
                  <span key={idx} className="hover:scale-105 transition">
                    <AccentData>#{tag}</AccentData>
                  </span>
                ))}
              </div>
            )}

            <div className="mt-6 flex items-center justify-between">
              <span className="flex items-center gap-2 text-cyan-400">
                <Heart className="w-5 h-5 group-hover:scale-110 transition" />
                <span className="font-medium">{project?.meta?.loves || 0}</span>
              </span>
              <span className="text-xs text-cyan-500 italic">
                Click card for details →
              </span>
            </div>
          </div>
        </CardWrapper>
      </div>

      {/* Modal outside clickable card */}
      <ProjectDetailModal
        isOpen={detailsModal}
        projectId={project?.id}
        onClose={() => setDetailsModal(false)}
      />
    </>
  );
}
