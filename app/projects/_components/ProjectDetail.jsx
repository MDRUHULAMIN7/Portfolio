
import AccentData from "@/components/buttons/AccentData";
import MetaDatas from "./MetaDatas";
import ProjectSlide from "./ProjectSlide";



export default function ProjectDetails({ project }) {
  if (!project) return null;


  return (

    <div className="p-6 max-w-5xl mx-auto bg-[#1a1a1a] text-gray-300 border border-gray-700 shadow-lg rounded-2xl space-y-6">
   


      <div className="flex flex-col md:flex-row gap-6 md:items-center">
        {/* Slider */}
       <ProjectSlide images={project?.images} />


        {/* Meta Info */}
<MetaDatas meta={project.meta} links={project.links} />

      </div>

      {/* Title + Description */}
      <div>
     


        <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
        <p className="mb-6">{project.description}</p>

         {/* Hashtags */}
        {project.hashtags?.length > 0 && (
          <div className="flex flex-wrap gap-2 my-3">
            {project.hashtags.map((tag, idx) => (
              <span
                key={idx}
                className=" hover:scale-105 transition"
              >
                <AccentData>#{tag}</AccentData>
                
              </span>
            ))}
          </div>
        )}

        {/* Features */}
        {project.features?.map((featureGroup, i) => (
          <div key={i} className="mb-6">
             <h2 className="text-2xl font-semibold mb-3">Features & Highlights</h2>
            <h2 className="text-xl font-semibold mb-3">For {featureGroup.group}:</h2>
            <ul className="space-y-2">
              {featureGroup.items.map((item, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  {item.icon && <span className="text-lg">{item.icon}</span>}
                  <span>{idx+1}.</span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Tech Stack */}
        {project.techStack?.length > 0 && (
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-3">Technologie & Tools</h2>

            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.techStack.map((tech, i) => (
                <li key={tech._id || i} className=" px-3 py-2 rounded-lg ">
                  <strong>{tech.name ?? "Tech"}:</strong> {tech.value ?? "-"}
                </li>
              ))}
            </ul>
          </div>
        )}

       
      </div>
    </div>
  );
}
