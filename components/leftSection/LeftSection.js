"use client";

import { Typewriter } from "react-simple-typewriter";
import ProjectBtn from "../projectBtn/ResumeBtn";
import Description from "./Description";

function LeftSection({ resumeUrl }) {
const jobRoles = ['Next.js Developer.','Frontend Developer.','MernStack Developer.','React Developer.','FullStack Developer.']

  return (
    
    <div className=" w-full xl:w-3/5 lg:1/2 mb-10 2xl:mb-30 mt-0 md:mt-10 2xl:mt-8 lg:mt-0 px-3 md:px-8 lg:px-0 ">
      <p className="uppercase text-xl text-gray-400 mb-3">“As-Salamu Alaykum”</p>
      <h1 className="text-4xl 2xl:text-[90px]  xl:text-6xl font-bold leading-tight">
        I’m <span className="text-white">Ruhul Amin</span>
      </h1>
      <h2 className="text-3xl  sm:text-5xl xl:text-4xl 2xl:text-7xl  font-semibold text-cyan-400 ">
        A{" "}
        <Typewriter
          words={jobRoles}
          loop={true}
          cursor
          cursorStyle="_"
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={2000}
        />
      </h2>
  <Description mobile={false}></Description>

      <ProjectBtn resume={resumeUrl}></ProjectBtn>
    </div>
  );
}

export default LeftSection;
