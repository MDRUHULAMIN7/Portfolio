import { getCourses } from "@/queries/course";
import CourseTable from "./_components/CourseTable";
import { dbConnect } from "@/service/mongoose";
import Heading from "@/components/Heading";

export default async function page() {
    await dbConnect();
    const courses = await getCourses();
    
  return (
    <div>
        <Heading title1="Courses" title2="Manage Your Courses" />
        <CourseTable courses={courses} />
    </div>
  )
}
