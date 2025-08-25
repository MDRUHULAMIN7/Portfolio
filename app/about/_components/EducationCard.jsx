'use client';
import CardWrapper from '@/components/CardWrapper';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';


const EducationCard = ({ edu }) => {
  useEffect(() => {
    AOS.init({ duration: 300, once: false });
  }, []);

  return (
    <CardWrapper className={"p-6 lg:p-10"}>
      <div data-aos="fade-up">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg md:text-3xl font-bold text-gray-200">{edu.title}</h3>
          <span className="text-sm px-3 py-2 rounded-full bg-cyan-700 text-gray-200 shadow">
            {edu.result}
          </span>
        </div>
        <p className="text-lg text-gray-300 mb-3">
          {edu.Institute} <span className="text-white">({edu.stage})</span>
        </p>
        <hr className="border-[#2c3e57] mb-3 text-lg" />
        <p className="text-base text-gray-300 leading-relaxed">{edu.description}</p>
      </div>
    </CardWrapper>
  );
};

export default EducationCard;
