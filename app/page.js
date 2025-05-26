import Avatar from "@/components/avatar/Avatar";
import LeftSection from "@/components/leftSection/LeftSection";

import { getAvatar } from "@/queries/avatar";
import About from "./about/page";
import SectionWrapper from "@/components/sectionWrapper/SectionWrapper";
import Services from "./services/page";

const Home = async () => {
  const avatarData = await getAvatar();

  return (
    <>
      {/* Hero Section */}
      <SectionWrapper>
        <div
          id="home"
          className="flex flex-col-reverse lg:flex-row items-center md:items-end w-full xl:gap-10 min-h-screen"
        >
          <LeftSection avatarData={avatarData?.[0]} />
          <div className="w-full xl:w-2/5 lg:1/2">
            <Avatar avatarData={avatarData} />
          </div>
        </div>
      </SectionWrapper>

      {/* Services Section */}
      <SectionWrapper>
        <section id="services" className="scroll-mt-20">
         <Services></Services>
        </section>
      </SectionWrapper>

      {/* About Section */}
      <SectionWrapper>
        <section id="about" className="scroll-mt-20">
          <About />
        </section>
      </SectionWrapper>

      {/* Projects Section */}
      <SectionWrapper>
        <section id="projects" className="scroll-mt-20">
          <h1 className="text-3xl">Project</h1>
        </section>
      </SectionWrapper>
    </>
  );
};

export default Home;
