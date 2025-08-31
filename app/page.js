import Avatar from "@/components/avatar/Avatar";
import LeftSection from "@/components/leftSection/LeftSection";

import { getAvatar } from "@/queries/avatar";
import About from "./about/page";
import SectionWrapper from "@/components/sectionWrapper/SectionWrapper";
import Services from "./services/page";
import Projects from "./projects/page";
import Testimonials from "./testimonials/page";
import Contact from "./contact/page";
import Blog from "./blog/page";
import Footer from "@/components/Footer";


const Home = async () => {
  const avatarData = await getAvatar();


  return (
    <>
      {/* Hero Section */}
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

      {/* Services Section */}
      <SectionWrapper>
        <section id="services">
         <Services></Services>
        </section>
      </SectionWrapper>

      {/* About Section */}
      <SectionWrapper>
        <section id="about">
          <About />
        </section>
      </SectionWrapper>

      {/* Projects Section */}
      <SectionWrapper>
        <section id="projects">
          <Projects/>
        </section>
      </SectionWrapper>
     

      {/* Testimonials Section */}
      <SectionWrapper>
        <section id="testimonials" className="">
          <Testimonials/>
        </section>
      </SectionWrapper>

      {/* Blog Section */}
      <SectionWrapper>
        <section id="blog" className="" >

          <Blog/>
        </section>
      </SectionWrapper>

      {/* Contact Section */}
      <SectionWrapper>
        <section id="contact" className="">

          <Contact/>
        </section>
      </SectionWrapper>
      <SectionWrapper>
       

        <Footer/>

        
      </SectionWrapper>

    </>
  );
};

export default Home;
