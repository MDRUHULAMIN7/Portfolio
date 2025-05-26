
import LoginForm from "@/components/auth/LoginForm";


const LoginPage = () => {
  return (
 <div className="relative min-h-screen w-full overflow-hidden text-white">
    
      <div
        className="absolute inset-0 bg-no-repeat bg-cover bg-center z-0"
        style={{ backgroundImage: "url('/theme_frame.jpeg')" }}
      ></div>

     
      <div className="absolute inset-0 bg-black opacity-70 z-0"></div>

      <div className="relative max-w-96 mx-auto  mt-44 sm:mt-52 sm:max-w-[500px] z-10 ">
        <div className="text-center">
          
          <LoginForm />
        </div>
      </div>
    </div>
  )
}

export default LoginPage;