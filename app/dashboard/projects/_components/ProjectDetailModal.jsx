
import { X } from "lucide-react";
import ProjectDetails from "./ProjectDetails";
import { useEffect } from "react";
import LoadingUi from "@/components/loadings/LoadingUi";


export default function ProjectDetailsModal({ isOpen, onClose, project }) {


  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }


    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-center items-center p-4 mt-14">
      <div className="bg-gray-900 rounded-xl shadow-xl w-full max-w-xl lg:max-w-5xl   max-h-[90vh]  noscrollbar  overflow-y-auto relative">
   
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="p-6">
         {!project && <LoadingUi />}
          {project && <ProjectDetails project={project} />}
          

        </div>
      </div>
    </div>
  );
}
