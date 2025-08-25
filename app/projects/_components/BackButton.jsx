
// "use client"

import Link from "next/link";
import {  ArrowLeft } from 'lucide-react';
const BackButton = () => {
  return (
      <Link href="/" className="block no-underline text-cyan-400 text-2xl mb-3 lg:mb-0">
   <ArrowLeft size={40} />
    </Link>
  )
}

export default BackButton



