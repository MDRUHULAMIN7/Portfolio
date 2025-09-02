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
    // <div className="fixed inset-0 bg-black/80 flex justify-center items-center p-4 mt-14 backdrop-blur-sm z-50">
    <div className="fixed inset-0 bg-black/80 flex justify-center items-center p-4 backdrop-blur-sm z-50">

      <div className=" rounded-xl bg-gray-900  w-full max-w-xl lg:max-w-5xl 2xl:max-w-7xl max-h-[88vh] noscrollbar   overflow-y-auto relative border-gray-700 border shadow-lg">
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



// "use client";

// import { X } from "lucide-react";
// import { useEffect } from "react";
// import ProjectDetail from "./ProjectDetail";
// import LoadingUi from "@/components/loadings/LoadingUi";

// export default function ProjectDetailModal({ isOpen, onClose, project }) {
//   // Lock body scroll when modal is open
//   useEffect(() => {
//     if (isOpen) document.body.style.overflow = "hidden";
//     else document.body.style.overflow = "auto";

//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, [isOpen]);

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 flex items-center justify-center p-4 backdrop-blur-sm" style={{ zIndex: 99999 }}>
//       {/* Modal Backdrop */}
//       <div 
//         className="absolute inset-0 bg-black/80"
//         onClick={onClose}
//       />

//       {/* Modal Content */}
//       <div className="relative bg-gray-900 rounded-xl shadow-2xl max-w-3xl h-[80vh] w-full border border-gray-700 overflow-hidden">
//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 z-10 text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-gray-800"
//         >
//           <X className="w-6 h-6" />
//         </button>

//         {/* Modal Body */}
//         <div className="h-full overflow-y-auto p-6">
//           {!project ? (
//             <div className="flex justify-center items-center h-64">
//               <LoadingUi />
//             </div>
//           ) : (
//             <ProjectDetail project={project} />
//           )}
//         </div>
//       </div>
//     </div>

//   );
// }
