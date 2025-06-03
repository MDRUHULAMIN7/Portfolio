import { replaceMongoIdInArray } from "@/lib/convertData";
import { Course } from "@/model/course-model";
;


export async function getCourses() {

  const courseData = await Course?.find()?.lean();
  return replaceMongoIdInArray(courseData)
}
