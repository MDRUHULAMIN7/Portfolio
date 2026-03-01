import Heading from "@/components/Heading";
import ProjectCard from "./_components/ProjectCard";
import { getProjects } from "@/queries/project";


export default async function Projects() {

  const projectsData = await getProjects();



  return (
    <div className=" bg-primary/30   px-3  text-center xl:text-left  pt-16">
      <Heading title1="My Projects" title2="Projects & Works" />

      <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 gap-6 ">
        {projectsData.map((project, idx) => (
          <ProjectCard project={project} key={project.id || idx} />

        ))}
      </div>
    </div>
  );
}
