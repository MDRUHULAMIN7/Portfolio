import { getAllProjects } from "@/queries/project";
import ProjectsTable from "./_components/ProjectsTable";


export default async function ProjectsPage() {
  const projects = await getAllProjects();
  
  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4 rounded-lg">

      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Projects Management</h1>
          <p className="text-gray-400">Manage your projects, edit details, and update status</p>
        </div>
        
        <ProjectsTable projects={projects || []} />
      </div>
    </div>
  );
}