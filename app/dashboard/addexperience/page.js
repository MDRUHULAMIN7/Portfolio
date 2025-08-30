import { getExperiences } from "@/queries/experience";
import ExperienceTable from "./_components/ExperienceTable";
import Heading from "@/components/Heading";




export default async function AddExperiencePage() {

  const experiences = await getExperiences();



  return (
    <div className="md:p-6 p-2">
 <Heading title1="My Experiences" title2={'Work & Event'} />

      <ExperienceTable experiencesdata={experiences} />
    </div>
  );
}
