import { getAllTestimonials } from "@/queries/testimonial"
import TestimonialTable from "./_components/TestimonialTable"



export default  async function TestimonialPage() {
   
    const testimonials = await getAllTestimonials()
   

   
  return (
    <div>
       
      
      <TestimonialTable  testimonialsData={testimonials}  />


  
    </div>
  )
}