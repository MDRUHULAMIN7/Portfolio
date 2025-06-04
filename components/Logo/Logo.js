"use client"

import Link from "next/link";

function Logo() {
  return (
   
        <Link className="flex items-center" href={
            '/'
        }>

          
            <h3 className="flex gap-1 text-[22px] pt-[4.3px] font-bold"> <span className="text-cyan-400">Ruhul</span> <span className="text-white"> Amin</span> 
            <span className="text-cyan-400"> .</span>
            </h3>
        </Link>
  )
}

export default Logo