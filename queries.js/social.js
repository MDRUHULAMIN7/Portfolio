import { replaceMongoIdInArray } from "@/lib/convertData";
import { Social } from "@/model/social-model";



export async function getSocialLinks() {
  const socialData = await Social?.find()?.lean();
  return replaceMongoIdInArray(socialData);
}