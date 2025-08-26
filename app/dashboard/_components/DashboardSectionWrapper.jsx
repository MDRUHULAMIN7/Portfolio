const DashboardSectionWrapper = ({ children }) => {
  return (
    <div className="relative min-h-screen w-full  py-10">
  
      <div
        className="absolute inset-0 bg-[#203550] z-0"
        // className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        // style={{ backgroundImage: "url('/theme_frame.jpeg')" }}
      ></div>

      <div className="absolute inset-0 bg-black opacity-70 z-0"></div>

     
      <div className="relative z-10 px-2 sm:px-4 lg:px-10 2xl:px-36 text-white">
        {children}
      </div>
    </div>
  );
};

export default DashboardSectionWrapper;
