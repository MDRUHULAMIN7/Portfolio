import Heading from "@/components/Heading"
import Image from "next/image"


const Skills = ({skills}) => {
  return (
    <div>

     <Heading title1={'My Qualifications'} title2={'Skills & Tools'}/>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 ">
        {skills.map((skill, index) => (
     <div
  key={skill.id}
  data-aos="zoom-in"
  data-aos-delay={index * 100}
  className={`relative group rounded-2xl p-[2px]  transition-all duration-300 shadow-lg`}
>
  <div className={`rounded-2xl bg-[#1a1a1a] p-6 h-full w-full flex flex-col items-center justify-center 
                  border-1 border-transparent ${skill.color}
                  group-hover:scale-[1.03] transition-all duration-300`}>
    <Image
      height={200}
      width={300}
      src={skill.icon}
      alt={`${skill.title} icon`}
      className="w-14 h-14 object-contain mb-4 drop-shadow-md"
    />
    <h3 className="text-white text-lg font-semibold tracking-wider uppercase">
      {skill.title}
    </h3>
  </div>
</div>


        ))}
      </div>
    </div>
  )
}

export default Skills