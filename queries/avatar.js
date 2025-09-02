
import { replaceMongoIdInArray, replaceMongoIdInObject } from "@/lib/convertData";
import { Avatar } from "../model/avatar-model";



export async function getAvatar() {

  const avatarData = await Avatar?.find()?.lean();
  return replaceMongoIdInArray(avatarData)
}
export async function getResume() {
  const avatarData = await Avatar?.find()?.select('resume').lean();
  return replaceMongoIdInObject(avatarData[0]);
}