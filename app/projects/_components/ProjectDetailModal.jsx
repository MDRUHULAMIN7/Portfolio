"use client";

import { useEffect, useState } from "react";
import ProjectDetail from "./ProjectDetail";
import ModalWrapper from "@/components/ModalWrapper";
import LoadingUi from "@/components/loadings/LoadingUi";

export default function ProjectDetailModal({ isOpen, onClose, project }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 500); // show loader for 1s
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <div className="p-6">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <LoadingUi />
          </div>
        ) : !project ? (
          <div className="flex justify-center items-center h-64">
            <LoadingUi />
          </div>
        ) : (
          <ProjectDetail project={project} />
        )}
      </div>
    </ModalWrapper>
  );
}
