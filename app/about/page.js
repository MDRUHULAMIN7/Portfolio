
import SkillCard from './_components/Skill';
import Education from './_components/Education';
import Course from './_components/Course';







const About = async() => {

  return (
<div className="min-h-screen bg-primary/30 py-12 px-4 text-center xl:text-left">
<SkillCard></SkillCard>

<Education ></Education>

<Course></Course>


    </div>
  );
};

export default About;
