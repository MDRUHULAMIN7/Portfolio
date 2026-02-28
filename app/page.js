import Avatar from "@/components/avatar/Avatar";
import LeftSection from "@/components/leftSection/LeftSection";

import HeroServer from "@/components/HeroServer";
import { Suspense } from "react";
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
  return (
    <div className="max-w-[1920px] mx-auto">
      {/* Hero Section */}
      <HeroServer />

      {/* Services Section */}
      <SectionWrapper>
        <section id="services" className="">
          <Services></Services>
        </section>
      </SectionWrapper>

      {/* About Section */}
      <SectionWrapper>
        <section id="about" className="">
          <Suspense fallback={null}>
            <About />
          </Suspense>
        </section>
      </SectionWrapper>

      {/* Projects Section */}
      <SectionWrapper>
        <section id="projects" className="">
          <Suspense fallback={null}>
            <Projects />
          </Suspense>
        </section>
      </SectionWrapper>

      {/* Testimonials Section */}
      <SectionWrapper>
        <section id="testimonials" className="">
          <Suspense fallback={null}>
            <Testimonials />
          </Suspense>
        </section>
      </SectionWrapper>

      {/* Blog Section */}
      <SectionWrapper>
        <section id="blog" className="">
          <Suspense fallback={null}>
            <Blog />
          </Suspense>
        </section>
      </SectionWrapper>

      {/* Contact Section */}
      <SectionWrapper>
        <section id="contact" className="">
          <Suspense fallback={null}>
            <Contact />
          </Suspense>
        </section>
      </SectionWrapper>
      <SectionWrapper>
        <Footer />
      </SectionWrapper>
    </div>
  );
};

export default Home;
