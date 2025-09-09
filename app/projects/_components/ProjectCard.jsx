'use client';

import AccentData from '@/components/buttons/AccentData';
import CardWrapper from '@/components/CardWrapper';
import { Heart } from 'lucide-react';
import { useState } from 'react';
import ProjectDetailModal from './ProjectDetailModal';
import Image from 'next/image';

export default function ProjectCard({ project }) {
  const [detailsModal, setDetailsModal] = useState(false);

  return (
    <>
      {/* Card */}
      <div
        onClick={() => setDetailsModal(true)}
        className="block  cursor-pointer"
      >
        <CardWrapper hoverGradient="rgba(59,130,246,0.2)" className="p-4">
         
          <div className="relative w-full h-56 overflow-hidden rounded-2xl">
            <Image
              src={project.images[0]}
              width={300}
              height={400}
              alt={project.title}
              className="w-full h-full object-container transform group-hover:scale-110 transition duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent rounded-2xl" />
          </div>

          
          <div className="flex flex-col flex-grow pt-4 px-1">
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
        project={project}
        onClose={() => setDetailsModal(false)}
      />
    </>
  );
}
