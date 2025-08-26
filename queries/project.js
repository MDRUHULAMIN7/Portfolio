import { replaceMongoIdInArray, replaceMongoIdInObject } from "@/lib/convertData";
import { Project } from "@/model/project-model";
// get projects for Project card
export async function getProjects() {
  const projectsData = await Project.find({ status: "publish" })
    .select("images title meta description hashtags") 
    .lean();

  return replaceMongoIdInArray(projectsData);
}
// get projects for Dashboard
export async function getAllProjects() {
  const projectsData = await Project.find().lean();

  return replaceMongoIdInArray(projectsData);
}

export async function getProjectById(id) {
  const projectData = await Project.findById(id).lean();

  return replaceMongoIdInObject(projectData);

}
