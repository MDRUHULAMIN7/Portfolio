'use client';
import CardWrapper from '@/components/CardWrapper';
import { useEffect, useState, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Image from 'next/image';
import { RxCross1 } from 'react-icons/rx';
import ModalWrapper from '@/components/ModalWrapper';
import LoadingUi from '@/components/loadings/LoadingUi';

const CourseCard = ({ course }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const init = () => AOS.init({ duration: 300, once: true });
    if (typeof window.requestIdleCallback === 'function') {
      window.requestIdleCallback(init, { timeout: 800 });
    } else {
      setTimeout(init, 300);
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? 'hidden' : 'auto';
    return () => (document.body.style.overflow = 'auto');
  }, [isModalOpen]);

  return (
    <>
      <CardWrapper className="p-6 lg:p-10" ref={cardRef} hoverGradient="rgba(59,130,246,0.2)">
        <div data-aos="fade-up" className="relative z-10">
        
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg md:text-3xl font-bold text-gray-200">{course.title}</h3>
          </div>

       
          <p className="text-lg text-left text-gray-300 mb-3">
            {course.from} <span className="text-white">({course.time})</span>
          </p>

          <hr className="border-[#2c3e57] mb-3 text-lg" />

          <p className="text-base text-left text-gray-300 leading-relaxed">{course.description}</p>

         
          {course.credentials && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-4  bg-[#2c3e57] hover:bg-cyan-600 flex justify-start cursor-pointer text-white px-4 py-2 rounded-md transition duration-300"
            >
              See Credential
            </button>
          )}
        </div>
      </CardWrapper>

      {/* Modal */}
      {isModalOpen && (
        <>
        { !course?.credentials && <LoadingUi/> }
        { course?.credentials && <ModalWrapper isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>

       
            <div className="  rounded-lg p-2 mt-8 sm:mt-1 max-w-lg md:max-w-6xl relative">
            
              <Image
                height={700}
                width={700}
                src={course.credentials}
                alt="Certificate"
                className="w-full h-full rounded-md "
              />
            </div>
          </ModalWrapper> }
        </>
      )}
    </>
  );
};

export default CourseCard;
