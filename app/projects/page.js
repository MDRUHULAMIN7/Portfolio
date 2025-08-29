import Heading from "@/components/Heading";
import ProjectCard from "./_components/ProjectCard";
import { getProjects } from "@/queries/project";


export default async function Projects() {

  const projectsData = await getProjects();
  // console.log(projectsData)


  return (
    <div className="min-h-screen bg-primary/30 py-12  px-4 text-center xl:text-left">
      <Heading title1="My Projects" title2="Projects & Works" />

      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-10 md:mt-16 lg:mt-20">
        {projectsData.map((project, idx) => (
          <ProjectCard project={project} key={idx} />

        ))}
      </div>
    </div>
  );
}
