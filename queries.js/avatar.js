
import { replaceMongoIdInArray } from "@/lib/convertData";
import { Avatar } from "../model/avatar-model";



export async function getAvatar() {

  const avatarData = await Avatar?.find()?.lean();
  return replaceMongoIdInArray(avatarData)
}
