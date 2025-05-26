// icons
import {
  FaHtml5,
  FaCss3,
  FaJs,
  FaReact,

} from "react-icons/fa";

import {

  SiNodedotjs,
  SiMongodb,
  SiExpress,
  SiTailwindcss,
} from "react-icons/si";




//  data
const aboutData = [

  {
    title: 'skills',
    info: [
      {
        title: 'Web Development',
        icons: [
        <FaHtml5 key="html5" className="text-green-500"></FaHtml5>,
          <FaCss3 key="css3" className="text-blue-500" />, 
          <SiTailwindcss key="tailwind" className="text-cyan-500"></SiTailwindcss>,
          <FaJs key="js" className="text-yellow-500" />,
          <FaReact key="react" className="text-cyan-300" />,
          
          <SiNodedotjs key="nodejs" className="text-[#3c873a]" ></SiNodedotjs>,
          <SiExpress key="express" className="text-[#504d4d]" ></SiExpress>,
          <SiMongodb key="mongodb" className="text-[#68c139]"></SiMongodb>,
       
        ],
      },
      
    ],
  },
  
  {
    title: 'experience',
    info: [
     
      {
        title1: `Course
                 `,
        title: `Complet Web Development 
                 `,
        title2: ` 
                  -with Programing-hero`,
        stage: '2024-present',
        certifecate:"",
      },
     
    ],
  },
  {
    title: 'Education',
    info: [
     
      {
        title: `Computer Science Technology
                    `,
        title2: ` Rajshahi Polytechnic Institute
                    `,
               stage: '2023 - present',
      },
      
    ],
  },
];


const About = () => {


  return <div className="h-screen bg-primary/30 py-0 xl:py-4 text-center xl:text-left">
  thi s a about page
  </div>;
};

export default About;
