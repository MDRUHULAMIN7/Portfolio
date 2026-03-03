
import Navs from '../Navs/Navs'
import Socials from '../Socials/Socials'

import Logo from '../Logo/Logo';
import Description from '../leftSection/Description';

function Sidebar({animateSidebar,links,session,navs,loginPermission}) {



  return (
     <div
            className={`fixed top-0 left-0 w-[280px] h-full bg-[#0d1622] z-50 shadow-2xl px-6 py-6 flex flex-col gap-8
              transform transition-transform duration-300 ease-in-out
              ${animateSidebar ? "translate-x-0" : "-translate-x-full"}
            `}
          >
         <div className='flex justify-between'>
            <Logo></Logo>
         
         </div>

         <Description mobile={true}></Description>
           

            {/* Sidebar navs */}
            {navs && <div className="flex flex-col space-y-4">
              <Navs />
            </div>}

            {/* Socials at bottom */}
            <div className="mt-auto sm:hidden">
              <Socials loginPermission={loginPermission} links={links} session={session} />

            </div>
          </div>
  )
}

export default Sidebar
