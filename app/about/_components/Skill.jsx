import Heading from "@/components/Heading"
import Image from "next/image"
import SkillCard from "./SkillCard"


const Skills = ({skills}) => {
  return (
    <div>

     <Heading title1={'My Qualifications'} title2={'Skills & Tools'}/>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 ">
        {skills.map((skill, index) => (
   <SkillCard skill={skill} key={index} index={index}></SkillCard>


        ))}
      </div>
    </div>
  )
}

export default Skills