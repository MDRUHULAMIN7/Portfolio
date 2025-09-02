const DashboardSectionWrapper = ({ children }) => {
  return (
    <div className="relative min-h-screen w-full py-16">
  
      <div
        className="absolute inset-0 bg-[#203550] z-0"
  
      ></div>

      <div className="absolute inset-0 bg-black opacity-70 z-0"></div>

     
      <div className="relative  px-2 sm:px-4 lg:px-10 2xl:px-36 text-white">
        {children}
      </div>
    </div>
  );
};

export default DashboardSectionWrapper;
