"use client";

import Heading from "@/components/Heading";
import {
  FaShoppingCart,
  FaUsers,
  FaDatabase,
  FaLock,
  FaEnvelope,
  FaBox,
  FaChartBar,
} from "react-icons/fa";

// Import Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";

// 🔹 Projects Data Array
const projectsData = [
  {
    title: "Sokher Corner – E-Commerce Website",
    description: `Sokher Corner is a modern e-commerce platform specializing in home decoration and furniture. 
    It features a clean, user-friendly interface for customers to seamlessly browse, filter, and securely purchase products. 
    Sellers can efficiently manage inventory and monitor sales through a dedicated dashboard.`,

    features: {
      customers: [
        {
          icon: <FaBox />,
          text: "Browse products by category (e.g., Mattress, Sofa, Bedroom)",
        },
        { icon: <FaUsers />, text: "Filter by price and category" },
        {
          icon: <FaDatabase />,
          text: "Zoom in on product images using React Magnifier",
        },
        { icon: <FaLock />, text: "Secure checkout via SSLCOMMERZ" },
        {
          icon: <FaEnvelope />,
          text: "Receive automated emails with attached PDF order summaries",
        },
        { icon: <FaShoppingCart />, text: "Track order status" },
        { icon: <FaChartBar />, text: "Explore new arrivals and trending products" },
      ],
      sellers: [
        { icon: <FaShoppingCart />, text: "Manage products and orders" },
        { icon: <FaChartBar />, text: "View analytics and sales reports" },
      ],
    },

    techStack: {
      framework: "Next.js (Full-stack React framework)",
      styling: "Tailwind CSS",
      backend: "Node.js, Express.js",
      database: "MongoDB with Mongoose",
      authentication: "NextAuth",
      payment: "SSLCOMMERZ",
      pdf: "Puppeteer",
    },

    images: [
      "https://i.ibb.co.com/1NXSrw0/image.png",
      "https://i.ibb.co.com/1NXSrw0/image.png",
      "https://i.ibb.co.com/1NXSrw0/image.png",
      "https://i.ibb.co.com/1NXSrw0/image.png",
    ],

    meta: {
      type: "E-Commerce",
      service: "Web Development",
      budget: "$0",
      startDate: "2024-11-25",
      endDate: "2025-01-25",
      likes: 100,
    },
  },

  // 🔹 Add more projects here in the same structure
];

export const Projects = () => {
  return (
    <div className="min-h-screen bg-primary/30 py-12 px-4 text-center xl:text-left">
      <Heading title1={"My Projects"} title2={"Projects & Works"} />

      <div className="space-y-10">
        {projectsData.map((project, idx) => (
          <div
            key={idx}
            className="p-6 max-w-5xl mx-auto bg-[#1a1a1a] text-gray-300 border border-gray-700 shadow-lg rounded-2xl space-y-6"
          >
            {/* 🔹 Top Section (Slider + Info) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {/* Left - Slider */}
              <div className="bg-gray-800 p-4 rounded-lg">
                <Swiper
                  modules={[Navigation, Autoplay]}
                  spaceBetween={20}
                  slidesPerView={1}
                  navigation
                  autoplay={{ delay: 2500, disableOnInteraction: false }}
                  className="rounded-lg"
                >
                  {project.images.map((img, i) => (
                    <SwiperSlide key={i}>
                      <img
                        src={img}
                        alt={`Project ${i + 1}`}
                        className="rounded-lg shadow-md w-full object-contain"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* Right - Project Meta Info */}
              <div className="space-y-3">
                <p>
                  <strong>Type:</strong> {project.meta.type}
                </p>
                <p>
                  <strong>Service:</strong> {project.meta.service}
                </p>
                <p>
                  <strong>Budget:</strong> {project.meta.budget}
                </p>
                <p>
                  <strong>Start Date:</strong> {project.meta.startDate}
                </p>
                <p>
                  <strong>End Date:</strong> {project.meta.endDate}
                </p>
                <p>
                  <strong>Likes:</strong> {project.meta.likes}
                </p>

                <div className="flex gap-4 mt-4">
                  <button className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition">
                    Like ❤️
                  </button>
                  <button className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition">
                    View Project
                  </button>
                </div>
              </div>
            </div>

            {/* 🔹 Project Title & Description */}
            <div>
              <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
              <p className="mb-6">{project.description}</p>

              {/* Features Section */}
              <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-3">Features</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Customers */}
                  <div>
                    <h3 className="text-xl font-semibold mb-2">For Customers:</h3>
                    <ul className="space-y-2">
                      {project.features.customers.map((item, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <span className="text-lg">{item.icon}</span>
                          <span>{item.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Sellers */}
                  <div>
                    <h3 className="text-xl font-semibold mb-2">For Sellers:</h3>
                    <ul className="space-y-2">
                      {project.features.sellers.map((item, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <span className="text-lg">{item.icon}</span>
                          <span>{item.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Tech Stack */}
              <div>
                <h2 className="text-2xl font-semibold mb-3">Tech Stack</h2>
                <ul className="list-disc ml-6 space-y-1">
                  {Object.entries(project.techStack).map(([key, value], i) => (
                    <li key={i}>
                      <strong className="capitalize">{key}:</strong> {value}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
