"use client";

import { Typewriter } from "react-simple-typewriter";
import ProjectBtn from "../projectBtn/ResumeBtn";
import Description from "./Description";

function LeftSection({avatarData}) {


  return (
    <div className=" w-full lg:w-3/5 mb-10 mt-0 md:mt-10 lg:mt-0 px-2 md:px-8 lg:px-0 ">
      <p className="uppercase text-xl text-gray-400">Hello</p>
      <h1 className="text-5xl 2xl:text-7xl xl:text-6xl font-bold leading-tight">
        I’m <span className="text-white">Ruhul Amin</span>
      </h1>
      <h2 className="text-4xl  sm:text-5xl xl:text-4xl 2xl:text-6xl  font-semibold text-cyan-400 ">
        A{" "}
        <Typewriter
          words={avatarData?.jobRoles}
          loop={true}
          cursor
          cursorStyle="_"
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={2000}
        />
      </h2>
  <Description avatarData={avatarData} mobile={false}></Description>

      <ProjectBtn resume ={avatarData?.resume}></ProjectBtn>
    </div>
  );
}

export default LeftSection;
