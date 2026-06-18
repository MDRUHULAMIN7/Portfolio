import Hero from "@/components/Hero";
import { Suspense } from "react";
import About from "./about/page";
import SectionWrapper from "@/components/sectionWrapper/SectionWrapper";
import Services from "./services/page";
import Projects from "./projects/page";
import Testimonials from "./testimonials/page";
import Contact from "./contact/page";
import Blog from "./blog/page";
import Footer from "@/components/Footer";
import SectionSkeleton from "@/components/SectionSkeleton";

const Home = async () => {
  return (
    <div className="max-w-[1920px] mx-auto">
      {/* Hero Section */}
      <Hero />

    

      {/* About Section */}
      <SectionWrapper>
        <section id="about" className="">
          <Suspense fallback={<SectionSkeleton height={240} />}>
            <About />
          </Suspense>
        </section>
      </SectionWrapper>

      {/* Projects Section */}
      <SectionWrapper>
        <section id="projects" className="">
          <Suspense fallback={<SectionSkeleton height={260} />}>
            <Projects />
          </Suspense>
        </section>
      </SectionWrapper>
  {/* Services Section */}
      <SectionWrapper>
        <section id="services" className="">
          <Services></Services>
        </section>
      </SectionWrapper>
      {/* Testimonials Section */}
      <SectionWrapper>
        <section id="testimonials" className="">
          <Suspense fallback={<SectionSkeleton height={260} />}>
            <Testimonials />
          </Suspense>
        </section>
      </SectionWrapper>

      {/* Blog Section */}
      <SectionWrapper>
        <section id="blog" className="">
          <Suspense fallback={<SectionSkeleton height={220} />}>
            <Blog />
          </Suspense>
        </section>
      </SectionWrapper>

      {/* Contact Section */}
      <SectionWrapper>
        <section id="contact" className="">
          <Suspense fallback={<SectionSkeleton height={220} />}>
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
