import SectionWrapper from "@/components/sectionWrapper/SectionWrapper";
import { getProjectById } from "@/queries/project";
import ProjectDetails from "../_components/ProjectDetail";







export default async function ProjectDetailsPage({params}) {

const { id } = params;
const projectsData = await getProjectById(id);
// console.log(projectsData)
 const project = JSON.parse(JSON.stringify(projectsData));

  return (
    <div>
      <SectionWrapper>
      
        <ProjectDetails project={project}></ProjectDetails>

      </SectionWrapper>
    </div>
  );
}