'use client';


import Image from 'next/image';
import SkillCard from './_components/Skill';
import Education from './_components/Education';



// About Data
const aboutData = [
  {
    title: "skills",
    info: [
      {
        title: "Professional Skills",
       skills: [
  {
    id: 1,
    title: "Html 5",
    version: "5",
    icon: "https://res.cloudinary.com/dpomtzref/image/upload/v1748847718/html.png_sk12q7.png",
    updatedDate: "2025-06-02",
    color:"text-orange-300",
    bgHover:'	rgba(253, 186, 116, 0.2), transparent 60%)',
  },
  {
    id: 2,
    title: "Css",
    version: "3",
    icon: "https://res.cloudinary.com/dpomtzref/image/upload/v1748847748/css_xg48g3.png",
    updatedDate: "2025-06-02",
    color:"text-blue-400",
    bgHover:'	rgba(96, 165, 250, 0.2), transparent 60%)',
  },
  {
    id: 3,
    title: "JavaScript",
    version: "ES6+",
    icon: "https://res.cloudinary.com/dpomtzref/image/upload/v1748847798/javascript_yk6wwd.png",
    updatedDate: "2025-06-02",
    color:"text-yellow-400",
     bgHover:'rgba(250, 204, 21, 0.2), transparent 60%)',
  },
  {
    id: 4,
    title: "React.js",
    version: "18",
    icon: "https://res.cloudinary.com/dpomtzref/image/upload/v1748831992/react_xjfdd6.png",
    updatedDate: "2025-06-02",
    color:"text-cyan-300",
     bgHover:'rgba(103, 232, 249, 0.2), transparent 60%)',
  },
  {
    id: 5,
    title: "Tailwind CSS",
    version: "4",
    icon: "https://res.cloudinary.com/dpomtzref/image/upload/v1748831920/tailwind-css_tdedmz.png",
    updatedDate: "2025-06-02",
    color:"text-sky-400",
     bgHover:'rgba(56, 189, 248, 0.2), transparent 60%)',
  },
  {
    id: 6,
    title: "Next.js",
    version: "15",
    icon: "https://res.cloudinary.com/dpomtzref/image/upload/v1748845365/hh_hjjxuo.webp",
    updatedDate: "2025-06-02",
    color:"text-gray-500",
     bgHover:'	rgba(107, 114, 128, 0.2), transparent 60%)',
  },
  {
    id: 7,
    title: "GitHub",
    version: "9",
    icon: "https://res.cloudinary.com/dpomtzref/image/upload/v1748847832/github_c6dhuq.webp",
    updatedDate: "2025-06-02",

    color:"text-gray-400",
     bgHover:'rgba(156, 163, 175, 0.2), transparent 60%)',
  },
  {
    id: 8,
    title: "Git",
    version: "4",
    icon: "https://res.cloudinary.com/dpomtzref/image/upload/v1748847854/git_nd6tfh.webp",
    updatedDate: "2025-06-02",

     color:"text-orange-500",
    bgHover:'	rgba(249,115,22,0.2), transparent 60%)',
  }
]

      },
    ],
  },
  {
    title: "experience",
    info: [
      {
        title: "Complete Web Development",
        subtitle: "Programming Hero",
        stage: "2024 - Present",
      },
    ],
  },
  {
    title: "education",
    info: [
    {
  title: "Diploma in Computer Science",
  subject: "Computer Science & Technology",
  Institute: "Rajshahi Polytechnic Institute",
  stage: "2023 - Present",
  result: "Ongoing",
  description:
    "Currently pursuing a Diploma in Computer Science with a strong emphasis on software engineering, web development, and practical problem-solving skills.",
},
{
  title: "SSC",
  subject: "Science",
  Institute: "Borgachi Kuthipara High School",
  stage: "2017 - 2022",
  result: "5.00",
  description:
    "Successfully completed Secondary School Certificate with distinction in Science. Laid the groundwork for a career in technology through consistent academic performance and an early passion for programming.",
}

     
    ],
  },
];

const About = () => {


  const skills = aboutData.find((section) => section.title === 'skills')?.info[0]?.skills || [];
  const experience = aboutData.find((section) => section.title === 'experience')?.info || [];
  const education = aboutData.find((section) => section.title === 'education')?.info || [];

  return (
<div className="min-h-screen bg-primary/30 py-12 px-4 text-center xl:text-left">
<SkillCard skills={skills}></SkillCard>

<Education education={education}></Education>


    </div>
  );
};

export default About;
