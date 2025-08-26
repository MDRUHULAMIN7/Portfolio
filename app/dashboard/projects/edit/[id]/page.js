
import { AddProjects } from "@/app/dashboard/addprojects/_components/AddProjects";
import { getProjectById } from "@/queries/project";
import { EditProject } from "../../_components/EditProject";



export default async function EditProjectPage({ params }) {

  const { id } = params;

  const projectData = await getProjectById(id);




  if (!projectData) return <p>Loading project data...</p>;

  return <EditProject  projectData={projectData} projectId={id} />;

}
