import Avatar from "@/components/avatar/Avatar";
import LeftSection from "@/components/leftSection/LeftSection";
import { getAvatar } from "@/queries.js/avatar";
import About from "./about/page";
import { auth } from "@/auth";


const Home = async () => {
  const avatarData = await getAvatar();
   const session = await auth();
   console.log(session)


  return (
    <div className="relative min-h-screen w-full overflow-hidden text-white px-2 sm:px-4 lg:px-10 2xl:px-36">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-no-repeat bg-cover bg-center z-0"
        style={{ backgroundImage: "url('/theme_frame.jpeg')" }}
      ></div>

    
      <div className="absolute inset-0 bg-black opacity-70 z-0"></div>

      {/*  Hero Section */}
      <div id="home" className="relative z-10 flex flex-col-reverse lg:flex-row items-center md:items-end  w-full xl:gap-10 min-h-screen ">
        <LeftSection avatarData={avatarData?.[0]} />

        <div className="w-full xl:w-2/5 lg:1/2">
          <Avatar avatarData={avatarData} />
        </div>
      </div>

      {/*  service  Section */}
      <section id="services" className="relative z-10 min-h-screen scroll-mt-20">
      <h1 className="text-3xl">Service</h1>
      <h1 className="text-3xl">Service</h1>
      <h1 className="text-3xl">Service</h1>
      <h1 className="text-3xl">Service</h1>
      <h1 className="text-3xl">Service</h1>
      <h1 className="text-3xl">Service</h1>
      <h1 className="text-3xl">Service</h1>
      <h1 className="text-3xl">Service</h1>
      <h1 className="text-3xl">Service</h1>
      <h1 className="text-3xl">Service</h1>
      <h1 className="text-3xl">Service</h1>
      </section>



      {/*  About Section */}
      <section id="about" className="relative z-10 min-h-screen scroll-mt-20">
        <About />
      </section>
        {/* project Section */}
      <section id="projects" className="relative z-10 min-h-screen scroll-mt-20">
      <h1 className="text-3xl">Project</h1>
      <h1 className="text-3xl">Service</h1>
 
      </section>

    </div>
  );
};
export default Home