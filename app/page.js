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
import HeroContainer from "@/components/HeroContainer";



const Home = async () => {
  const avatarData = await getAvatar();


  return (
    <div className="max-w-[1920px] mx-auto">

      {/* Hero Section */}
      <HeroContainer avatarData={avatarData}></HeroContainer>

      {/* Services Section */}
      <SectionWrapper>
        <section id="services" className="">
         <Services></Services>
        </section>
      </SectionWrapper>

      {/* About Section */}
      <SectionWrapper>
        <section id="about" className="">
          <About />
        </section>
      </SectionWrapper>

      {/* Projects Section */}
      <SectionWrapper>
        <section id="projects" className="">

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

    </div>
  );
};

export default Home;
