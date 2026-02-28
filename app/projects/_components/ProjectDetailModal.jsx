"use client";
import { useEffect, useState } from "react";
import ProjectDetail from "./ProjectDetail";
import ModalWrapper from "@/components/ModalWrapper";
import LoadingUi from "@/components/loadings/LoadingUi";

export default function ProjectDetailModal({ isOpen, onClose, projectId }) {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;
    const fetchProject = async () => {
      if (!isOpen || !projectId) return;
      try {
        setLoading(true);
        const res = await fetch(`/api/projects/${projectId}`, { cache: "no-store" });
        const data = await res.json();
        if (active) setProject(data);
      } catch (e) {
        if (active) setProject(null);
      } finally {
        if (active) setLoading(false);
      }
    };
    fetchProject();
    return () => {
      active = false;
    };
  }, [isOpen, projectId]);

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <div className="p-6">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <LoadingUi />
          </div>
        ) : project ? (
          <ProjectDetail project={project} />
        ) : (
          <div className="flex justify-center items-center h-64">
            <LoadingUi />
          </div>
        )}
      </div>
    </ModalWrapper>
  );
}
