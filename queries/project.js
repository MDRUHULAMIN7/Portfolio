import { replaceMongoIdInArray, replaceMongoIdInObject } from "@/lib/convertData";
import { Project } from "@/model/project-model";

export async function getProjects() {
  const projectsData = await Project.find()
    .select("images title meta description hashtags") 
    .lean();

  return replaceMongoIdInArray(projectsData);
}
export async function getProjectById(id) {
  const projectData = await Project.findById(id).lean();

  return replaceMongoIdInObject(projectData);

}
