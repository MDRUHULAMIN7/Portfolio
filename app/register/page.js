import RegistrationForm from "@/components/auth/RegistrationForm";

const RegistrationPage = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden text-white">
    
      <div
        className="absolute inset-0 bg-no-repeat bg-cover bg-center z-0"
        style={{ backgroundImage: "url('/theme_frame.jpeg')" }}
      ></div>

     
      <div className="absolute inset-0 bg-black opacity-70 z-0"></div>

      <div className="relative max-w-80 mx-auto  mt-38 sm:mt-44 sm:max-w-96 z-10 ">
        <div className="text-center">
          
          <RegistrationForm />
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
