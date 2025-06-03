import Heading from "@/components/Heading"
import { getCourses } from "@/queries/course"
import CourseCard from "./CourseCard"



const Course =async () => {

    const datas = await getCourses()
    console.log(datas)
  return (
    <div className="mt-10 lg:mt-20">

         <Heading title1="learning Experience" title2="Completed Courses" />
           <div  className="  grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8">
                  {datas?.map((data, index) => (
             <CourseCard  course={data} key={index} />
         
         ))}
               </div>


    </div>
  )
}

export default Course