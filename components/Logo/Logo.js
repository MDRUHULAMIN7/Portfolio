"use client"

import Link from "next/link";
import Image from "next/image";
function Logo() {
  return (
   
        <Link className="flex items-center" href={
            '/'
        }>

            <Image
            src={'/logo.png'}
            alt="logo"
            height={100}
            className="h-5 w-5"
            width={100}/>
            <h3 className="flex gap-1 text-[22px] pt-[4.3px] font-bold"> <span className="text-cyan-400">uhul</span> <span className="text-white"> Amin</span> 
            <span className="text-cyan-400"> .</span>
            </h3>
        </Link>
  )
}

export default Logo