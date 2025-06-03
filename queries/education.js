import { replaceMongoIdInArray } from "@/lib/convertData";
import { Education } from "@/model/education-model";
;


export async function getEducations() {

  const educationData = await Education?.find()?.lean();
  return replaceMongoIdInArray(educationData)
}
