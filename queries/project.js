import { replaceMongoIdInArray } from "@/lib/convertData";
import { Project } from "@/model/project-model";

export async function getProjects() {
  const projectsData = await Project.find()
    .select("images title meta description hashtags") 
    .lean();

  return replaceMongoIdInArray(projectsData);
}
