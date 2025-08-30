import Heading from "@/components/Heading";
import TestimonialList from "./_components/TestimonialList";
import ReviewAdd from "./_components/ReviewAdd";
import { getPermissions } from "@/queries/permissions";


export default async function Testimonials() {

 const permission = await getPermissions()

    return(
          <div className="">
<div className="flex  items-center 
     justify-center md:justify-between px-2 md:px-6 lg:px-12 py-8 gap-2">

  {/* Heading - always center */}
  <div className="w-full md:flex-1 ">
    <Heading title1="Testimonials" title2="Reviews That Inspire" />
  </div>

  {/* ReviewAdd - right on desktop, below on mobile */}
  <div className=" md:w-auto flex  md:justify-end items-center mb-16 ">

   {permission[0]?.addReview && <ReviewAdd  />}
  </div>
</div>

    
       <TestimonialList/>
    </div>
    )
}