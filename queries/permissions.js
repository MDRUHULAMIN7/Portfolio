import { replaceMongoIdInArray } from "@/lib/convertData";
import { Permissions } from "@/model/permissions-model";

export async function getPermissions() {
  const permissionsData = await Permissions?.find()?.lean();
  return replaceMongoIdInArray(permissionsData);
}

