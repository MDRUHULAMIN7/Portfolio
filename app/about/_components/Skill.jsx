import Heading from "@/components/Heading";
import Image from "next/image";
import SkillCard from "./SkillCard";
import { getSkills } from "@/queries/skill";

const Skills = async () => {
  const data = await getSkills();

  return (
    <div className="pt-16">
      <Heading title1={"My Qualifications"} title2={"Skills & Tools"} />

      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8 ">
        {data.map((skill, index) => (
          <SkillCard skill={skill} key={index} index={index}></SkillCard>
        ))}
      </div>
    </div>
  );
};

export default Skills;
