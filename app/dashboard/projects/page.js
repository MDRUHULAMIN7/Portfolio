import { getAllProjects } from "@/queries/project";
import ProjectsTable from "./_components/ProjectsTable";
import Heading from "@/components/Heading";


export default async function ProjectsPage() {
  const projects = await getAllProjects();
  
  return (
    <div className="min-h-screen bg-[#1f2937] p-4 md:p-8  rounded-lg">

      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Heading title1={"All Projects"} title2={"Manage & Update Projects"}></Heading>


        </div>
        
        <ProjectsTable projects={projects || []} />
      </div>
    </div>
  );
}