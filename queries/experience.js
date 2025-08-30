import { replaceMongoIdInArray } from "@/lib/convertData";
import { Experience } from "@/model/experience-model";
import { dbConnect } from "@/service/mongoose";


export async function getExperiences() {
    await dbConnect();

  const experiences = await Experience.find().lean();
  return replaceMongoIdInArray(experiences);
}
