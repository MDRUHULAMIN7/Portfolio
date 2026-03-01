import { replaceMongoIdInArray, replaceMongoIdInObject } from "@/lib/convertData";
import { Project } from "@/model/project-model";
// get projects for Project card
export async function getProjects() {
  const projectsData = await Project.find({ status: "publish" })
    .sort({ order: 1, createdAt: -1 })
    .select("images title meta description hashtags createdAt") 
    .lean();

  return replaceMongoIdInArray(projectsData);
}
// get projects for Dashboard
export async function getAllProjects() {
  const projectsData = await Project.find().sort({ order: 1, createdAt: -1 }).lean();

  return replaceMongoIdInArray(projectsData);
}

export async function getProjectById(id) {
  const projectData = await Project.findById(id).lean();

  return replaceMongoIdInObject(projectData);

}
