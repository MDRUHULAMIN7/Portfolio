
import Navs from '../Navs/Navs'
import Socials from '../Socials/Socials'
import { HiOutlineX } from "react-icons/hi";
import Logo from '../Logo/Logo';
import Description from '../leftSection/Description';

function Sidebar({animateSidebar,toggleSidebar, avatarData,links}) {


  return (
     <div
            className={`fixed top-0 left-0 w-[280px] h-full bg-[#0d1622] z-50 shadow-2xl px-6 py-6 flex flex-col gap-8
              transform transition-transform duration-300 ease-in-out
              ${animateSidebar ? "translate-x-0" : "-translate-x-full"}
            `}
          >
         <div className='flex justify-between'>
            <Logo></Logo>
             <button
              onClick={toggleSidebar}
              className="text-cyan-400 text-3xl ml-auto cursor-pointer transition-transform duration-300 "
            >
              <HiOutlineX />
            </button>
         </div>

         <Description avatarData={ avatarData}  mobile={true}></Description>
           

            {/* Sidebar navs */}
            <div className="flex flex-col space-y-4">
              <Navs />
            </div>

            {/* Socials at bottom */}
            <div className="mt-auto">
              <Socials links={links} />
            </div>
          </div>
  )
}

export default Sidebar