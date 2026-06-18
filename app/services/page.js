// components/Services.jsx

import Heading from "@/components/Heading";
import ServiceCard from "./_components/ServiceCard";

import {
  FaLaptopCode,
  FaLayerGroup,
  FaShieldAlt,
  FaBolt,
  FaBrain,
  FaUsers,
} from "react-icons/fa";

const services = [
  {
    type: "fullstack",
    title: "Full Stack Development",
    icon: <FaLaptopCode className="text-cyan-400 text-7xl mb-4" />,
    description:
      "Building production-grade full-stack applications with React.js, Next.js, Node.js, Express.js, and MongoDB. I create scalable architectures, clean APIs, and responsive user experiences.",
  },
  {
    type: "architecture",
    title: "Scalable Application Architecture",
    icon: <FaLayerGroup className="text-cyan-400 text-7xl mb-4" />,
    description:
      "Designing modular systems with REST APIs, domain-driven backend structures, and maintainable codebases focused on scalability, performance, and long-term growth.",
  },
  {
    type: "security",
    title: "Authentication & Security Engineering",
    icon: <FaShieldAlt className="text-cyan-400 text-7xl mb-4" />,
    description:
      "Implementing secure authentication systems with JWT, refresh-token rotation, role-based access control, protected routes, and secure data handling strategies.",
  },
  {
    type: "realtime",
    title: "Real-Time Application Development",
    icon: <FaBolt className="text-cyan-400 text-7xl mb-4" />,
    description:
      "Developing real-time features using Socket.IO and WebSocket technologies including live chat, notifications, session management, and collaborative experiences.",
  },
  {
    type: "ai",
    title: "AI Integration & Automation",
    icon: <FaBrain className="text-cyan-400 text-7xl mb-4" />,
    description:
      "Integrating modern AI solutions using Gemini API, LLM workflows, and prompt engineering to build intelligent features and improve product experiences.",
  },
  {
    type: "leadership",
    title: "Technical Leadership & Delivery",
    icon: <FaUsers className="text-cyan-400 text-7xl mb-4" />,
    description:
      "Leading development workflows through Git, code reviews, team collaboration, and agile practices. Experienced in guiding teams to deliver client-ready products.",
  },
];

const Services = () => {
  return (
    <section
      id="services"
      className=" relative z-10  px-3  "
    >
      <Heading title1="Latest Service" title2="Services I Provide" />

   
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-9">
        {services.map((service, idx) => (
          <ServiceCard
            key={idx}
            index={idx}
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
