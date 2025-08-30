
import { getTestimonials } from "@/queries/testimonial";
import TestimonialCard from "./TestimonialCard";





export default async function TestimonialList() {

     
  
    const testimonials = await getTestimonials();

  return (
   <div className="">

    <TestimonialCard testimonials={testimonials} />
    



   
   </div>
  );
}
