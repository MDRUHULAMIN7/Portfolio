
import Heading from "@/components/Heading";
import EducationCard from "./EducationCard";
import { getEducations } from "@/queries/education";

const Education = async() => {

const datas = await getEducations()
  return ( 
  <div className="mt-10 lg:mt-20 ">

       <Heading title1="Academic Background" title2="My Education" />
      <div  className="  grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8">
         {datas?.map((edu, index) => (
    <EducationCard   edu={edu} key={index}></EducationCard>

))}
      </div>
  </div>
  );
};


export default Education;