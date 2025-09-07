import { getSkills } from "@/queries/skill";
import { dbConnect } from "@/service/mongoose";
import SkillsTable from "./_components/SkillsTable";
import Heading from "@/components/Heading";

export default async function SkillsPage() {
  await dbConnect();
  const data = await getSkills();
  return (
    <div className="p-4">
     <Heading title1="Skills" title2="Manage Your Skills" />
     {
    
        data.length === 0 ? (
          <p className="text-center mt-10 text-gray-500">No skills found. Please add some skills.</p>
        ) : (
           <SkillsTable skills={data} />
        )
     }
     
    </div>
  );
}
