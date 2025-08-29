import SectionWrapper from "@/components/sectionWrapper/SectionWrapper";
import { getProjectById } from "@/queries/project";
import ProjectDetails from "../_components/ProjectDetail";
import Heading from "@/components/Heading";







export default async function ProjectDetailsPage({params}) {

const { id } = params;
const projectsData = await getProjectById(id);
// console.log(projectsData)
 const project = JSON.parse(JSON.stringify(projectsData));

  return (
    <div>
      <SectionWrapper>
<div className="pt-16">
        <Heading title1="Project Details" title2={project.title} />
        <ProjectDetails project={project}></ProjectDetails>
</div>

      </SectionWrapper>
    </div>
  );
}