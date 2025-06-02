
import Heading from "@/components/Heading";
import EducationCard from "./EducationCard";

const Education = ({ education }) => {


  return (
  <div className="mt-10 lg:mt-20">

       <Heading title1="Academic Background" title2="My Education" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8">
         {education?.map((edu, index) => (
    <EducationCard edu={edu} index={index}></EducationCard>

))}
      </div>
  </div>
  );
};


export default Education;