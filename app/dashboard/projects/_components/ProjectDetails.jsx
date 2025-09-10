import MetaDatas from "@/app/projects/_components/MetaDatas"
import ProjectSlide from "@/app/projects/_components/ProjectSlide"



const ProjectDetails = ({ project }) => {

  return (
    <div>
           <div className="flex flex-col  gap-6 py-6">
       
       <ProjectSlide images={project?.images} />


       
<MetaDatas meta={project.meta} links={project.links} projectId={project.id} />


      </div>

  
      <div className="space-y-8">
     
        <div className="border-b border-gray-700 pb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            {project.title}
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed max-w-4xl" dangerouslySetInnerHTML={{ __html: project.description }}>
      
          </p>
        </div>

       
        {project.hashtags?.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-white">Tags</h3>
            <div className="flex flex-wrap gap-3">
              {project.hashtags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 text-sm font-medium text-cyan-400 border border-cyan-400/30 rounded-full hover:bg-cyan-400/10 hover:scale-105 transition-all duration-200 cursor-default"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

     
          <h2 className="text-3xl font-bold text-white border-b border-gray-700 pb-3">
              Features & Highlights
            </h2>
        {project.features?.length > 0 && (
          <div className="space-y-6">
          
            {project.features.map((featureGroup, i) => (
              <div key={i} className="space-y-4">
                <h3 className="text-xl font-semibold text-cyan-400 capitalize">
                 For {featureGroup.group} :
                </h3>
                <ul className="space-y-3 ml-4">
                  {featureGroup.items.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-4 text-gray-300">

                      <span className="text-cyan-400 font-bold text-lg mt-0.5 flex-shrink-0">
                        {String(idx + 1).padStart(2, '0')}.
                      </span>
                      <span className="text-base leading-relaxed">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

    
        {project.techStack?.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white border-b border-gray-700 pb-3">
              Technologies & Tools
            </h2>

            <div>
             
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.techStack.map((tech, i) => (
                <div
                  key={tech._id || i}
                  className="p-4 border border-gray-700 rounded-lg hover:border-gray-600 transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-white text-base">
                      {tech.name || "Technology"}
                    </span>
                    <span className="text-cyan-400 font-medium">
                      {tech.value || "N/A"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProjectDetails
