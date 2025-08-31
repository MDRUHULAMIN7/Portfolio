
import { X } from "lucide-react";
import ProjectDetail from "./ProjectDetail";
import { useEffect } from "react";
import LoadingUi from "@/components/loadings/LoadingUi";



export default function ProjectDetailModal({ isOpen, onClose, project }) {

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
    <div className="fixed inset-0 z-50 bg-black/80 flex justify-center items-center p-4 mt-14 backdrop-blur-sm ">
      <div className=" rounded-xl bg-gray-900  w-full max-w-xl lg:max-w-5xl 2xl:max-w-7xl max-h-[88vh]   noscrollbar  overflow-y-auto relative border-gray-700 border shadow-lg">
   
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="p-6  ">
         {!project && <LoadingUi />}
          {project && <ProjectDetail project={project} />}
        </div>
      </div>
    </div>
  );
}
