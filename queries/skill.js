import { replaceMongoIdInArray } from "@/lib/convertData";
;
import { Skill } from "@/model/skill-model";



export async function getSkills() {

  const skillData = await Skill?.find()?.lean();
  return replaceMongoIdInArray(skillData)
}
