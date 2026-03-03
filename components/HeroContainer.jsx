"use client";

import dynamic from "next/dynamic";
import SectionWrapper from "./sectionWrapper/SectionWrapper";
import LeftSection from "./leftSection/LeftSection";

const Avatar = dynamic(() => import("./avatar/Avatar"), {
  ssr: false,
  loading: () => <div className="w-full h-[80vh] sm:h-[100vh]" />,
});

export default function HeroContainer({ resumeUrl }) {
  return (
    <>
      <SectionWrapper>
        <div
          id="home"
          className="flex flex-col-reverse lg:flex-row items-center md:items-end w-full xl:gap-10"
        >
          <LeftSection resumeUrl={resumeUrl} />
          <div className="w-full xl:w-2/5 lg:1/2">
            <Avatar />
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
