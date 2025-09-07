'use client';

import { useState } from "react";
import Intro from "./Intro";
import SectionWrapper from "./sectionWrapper/SectionWrapper";
import LeftSection from "./leftSection/LeftSection";
import Avatar from "./avatar/Avatar";

export default function HeroContainer({ avatarData }) {
  const [introFinished, setIntroFinished] = useState(false);

  return (
    <>
      
      {!introFinished && <Intro onFinish={() => setIntroFinished(true)} />}

 
      {introFinished && (
        <SectionWrapper>
          <div
            id="home"
            className="flex flex-col-reverse lg:flex-row items-center md:items-end w-full xl:gap-10"
          >
            <LeftSection avatarData={avatarData?.[0]} />
            <div className="w-full xl:w-2/5 lg:1/2">
              <Avatar avatarData={avatarData} />
            </div>
          </div>
        </SectionWrapper>
      )}
    </>
  );
}
