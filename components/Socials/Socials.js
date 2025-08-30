import LoginButton from "@/components/auth/LoginButton";
import Link from "next/link";
import { RiFacebookLine, RiGithubLine, RiLinkedinLine } from "react-icons/ri";

export default  function Socials({links,loginPermission}) {

    



  const baseClasses =
    "relative w-10 h-10 text-white text-xl font-bold inline-flex items-center justify-center z-[1] rounded-full text-sm overflow-hidden";

  return (
    <div>
      <div className="flex items-center gap-x-3 text-xl">
          <Link
           
            href={links?.linkedin}
            target="_blank"
            className={baseClasses + " group bg-white/10 hover:text-white"}
          >
        
            <span className="absolute inset-0 bg-gradient-to-tr from-cyan-400 via-sky-500 to-blue-500 rounded-full scale-0 transition-transform duration-700 ease-out origin-center group-hover:scale-100"></span>

           
            <span className="relative z-10"><RiLinkedinLine /></span>
          </Link>
          <Link
          
            href={links?.github}
            target="_blank"
            className={baseClasses + " group bg-white/10 hover:text-white"}
          >
        
            <span className="absolute inset-0 bg-gradient-to-tr from-cyan-400 via-sky-500 to-blue-500 rounded-full scale-0 transition-transform duration-700 ease-out origin-center group-hover:scale-100"></span>

           
            <span className="relative z-10"> <RiGithubLine /></span>
          </Link>
          <Link
          
            href={links?.facebook}
            target="_blank"
            className={baseClasses + " group bg-white/10 hover:text-white"}
          >
        
            <span className="absolute inset-0 bg-gradient-to-tr from-cyan-400 via-sky-500 to-blue-500 rounded-full scale-0 transition-transform duration-700 ease-out origin-center group-hover:scale-100"></span>

           
            <span className="relative z-10"> <RiFacebookLine /></span>
          </Link>
          
      <LoginButton loginPermission={loginPermission} />


       
      </div>
    </div>
  );
}
