
import { GoDownload } from "react-icons/go";
import Link from "next/link";
function ProjectBtn({resume}) {
  return (
    
<div className="relative inline-block">
      <Link
      href={resume}
      target="_blank"
      className="group relative inline-flex items-center px-8 py-2  rounded-full text-white font-semibold transition-all duration-300 mt-4 overflow-hidden border border-white/20 backdrop-blur-sm bg-white/5 hover:text-white cursor-pointer"
    >
    
      <span className="absolute inset-0 z-0 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-[2000ms] ease-in-out"></span>

   
      <span className="relative z-10 flex items-center space-x-3">
      
        <span className="text-lg">Resume</span>
          <GoDownload className="text-xl transition-all duration-300 transform group-hover:translate-x-1" />
      </span>

      <span className="absolute top-0 left-0 w-full h-full pointer-events-none group-hover:opacity-0 transition-opacity duration-300">
        <span className="glow-ball absolute w-[3px] h-[3px] bg-white rounded-full shadow-[0_0_4px_2px_white]"></span>
      </span>
    </Link>


 
  <style jsx>{`
    @keyframes borderGlowBall {
      0%   { top: 0%; left: 0%; transform: translate(0%, 0%); }
      25%  { top: 0%; left: 100%; transform: translate(-100%, 0%); }
      50%  { top: 100%; left: 100%; transform: translate(-100%, -100%); }
      75%  { top: 100%; left: 0%; transform: translate(0%, -100%); }
      100% { top: 0%; left: 0%; transform: translate(0%, 0%); }
    }

    .glow-ball {
      animation: borderGlowBall 6s linear infinite;
    }
  `}</style>
</div>
  )
}

export default ProjectBtn