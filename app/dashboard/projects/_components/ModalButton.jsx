"use client";

import { useState } from "react";
import { Eye } from "lucide-react";
import ProjectDetailsModal from "./ProjectDetailModal";


export default function ModalButton({ project }) {
  const [detailsModal, setDetailsModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setDetailsModal(true)}
        className="flex items-center text-cyan-400 hover:text-cyan-300 transition-colors duration-200 text-sm"
      >
        <Eye className="h-4 w-4 mr-1" />
        Details
      </button>

      <ProjectDetailsModal
        isOpen={detailsModal}
        project={project}
        onClose={() => setDetailsModal(false)}
      />
    </>
  );
}
