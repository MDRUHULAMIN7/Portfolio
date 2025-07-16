import { replaceMongoIdInObject } from "@/lib/convertData";
import { User } from "@/model/user-model";

export default async function getUserByEmail(email) {
    const user = await User.findOne({ email: email }).lean();
    console.log(user,'user in getUserByEmail');
    return replaceMongoIdInObject(user);
}
