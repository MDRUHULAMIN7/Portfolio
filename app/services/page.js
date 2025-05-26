// components/Services.jsx

import ServiceCard from "./_components/ServiceCard";



import {

  FaLaptopCode,
  FaPaintBrush,
  FaChartLine,
  FaLock,
  FaRocket,
  FaPlug,
} from "react-icons/fa";

const services = [
  {
    type: "development",
    title: "Web Development",
    icon: <FaLaptopCode className="text-cyan-400 text-5xl mb-4" />,
    description:
      "I design and build responsive web applications. My focus is on modern, user-friendly interfaces. Every project is crafted for performance and scalability.",
  },
  {
    type: "design",
    title: "UI's Design",
    icon: <FaPaintBrush className="text-cyan-400 text-5xl mb-4" />,
    description: "Creating beautiful and user-friendly interfaces.",
  },
  {
    type: "auth",
    title: "Authentication & Security",
    icon: <FaLock className="text-cyan-400 text-5xl mb-4" />,
    description:
      "Implement secure login systems with NextAuth, OAuth, Jwt, and Firebase Authentication. I ensure robust access control and data protection using modern authentication strategies. Your users’ trust is secured with industry best practices.",
  },
  {
    type: "seo",
    title: "SEO Optimization",
    icon: <FaChartLine className="text-cyan-400 text-5xl mb-4" />,
    description:
      "I optimize websites for better visibility on search engines. From technical SEO to keyword strategies, I help improve ranking, traffic, and user engagement.",
  },
  {
    type: "performance",
    title: "Performance Optimization",
    icon: <FaRocket className="text-cyan-400 text-5xl mb-4" />,
    description:
      "Speed matters. I fine-tune assets, lazy load components, and reduce bundle sizes. The result is faster load times and better user experience.",
  },
  {
    type: "api",
    title: "API Integration & Development",
    icon: <FaPlug className="text-cyan-400 text-5xl mb-4" />,
    description:
      "I develop powerful RESTful APIs using Node.js and Express. From integrating third-party services to connecting databases, I ensure smooth communication between frontend and backend.",
  },
];



const Services = () => {
  return (
    <section id="services" className="min-h-screen relative z-10 scroll-mt-20 px-4 py-20">
      <h2 className="text-4xl font-bold text-center mb-12 text-white">My Services</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, idx) => (
          <ServiceCard
            key={idx}
            type={service.type}
            title={service.title}
            icon={service.icon}
            description={service.description}
          />
        ))}
      </div>
    </section>
  );
};

export default Services;
