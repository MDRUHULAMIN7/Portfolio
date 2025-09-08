

const SectionWrapper = ({ children }) => {
  return (
    <div className="relative w-full  ">
  
      <div
        // className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        className="absolute inset-0 bg-[#203550] z-0"
        // style={{ backgroundImage: "url('/bg3.jpg')" }}
      ></div>

      <div className="absolute inset-0 bg-black/90 opacity-70 z-0"></div>

     
      <div className="relative  px-2 sm:px-4 lg:px-10 2xl:px-36 text-white">
        {children}
      </div>
    </div>
  );
};

export default SectionWrapper;
