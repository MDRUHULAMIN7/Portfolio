
import SkillCard from './_components/Skill';
import Education from './_components/Education';
import Course from './_components/Course';
import Experience from './_components/Experience';


const About = async() => {

  return (
<div className=" bg-primary/30 py-2  pt-16 px-4 text-center xl:text-left">
<Experience/>
<SkillCard></SkillCard>

<Education ></Education>

<Course></Course>


    </div>
  );
};

export default About;
