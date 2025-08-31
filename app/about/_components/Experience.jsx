import Heading from "@/components/Heading";
import { getExperiences } from "@/queries/experience";
import ExperienceCard from "./ExperienceCard";


const Experience = async () => {
  const experiences = await getExperiences();

  return (
    <div className=" px-4 md:px-12">
      <Heading title1={"My Experience"} title2={"Work Experience"} />
      <div className="">
        <ExperienceCard experiences={experiences} />
      </div>
    </div>
  );
};

export default Experience;
