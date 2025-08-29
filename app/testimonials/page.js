import Heading from "@/components/Heading";
import TestimonialList from "./_components/TestimonialList";

export default async function Testimonials() {

    return(
          <div className="min-h-screen bg-primary/30 py-12  px-4 text-center xl:text-left">
      <Heading title1="Testimonials" title2="Testimonials" />
    
       <TestimonialList/>
    </div>
    )
}