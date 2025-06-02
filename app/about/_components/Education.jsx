
import Heading from "@/components/Heading";
import EducationCard from "./EducationCard";
import { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Education = ({ education }) => {
  useEffect
  (() => {
    AOS.init({ duration: 300, once: false });
  }, []);

  return (
  <div className="mt-10 lg:mt-20">

       <Heading title1="Academic Background" title2="My Education" />
      <div  data-aos="fade-up" className="  grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8">
         {education?.map((edu, index) => (
    <EducationCard   edu={edu} key={index}></EducationCard>

))}
      </div>
  </div>
  );
};


export default Education;