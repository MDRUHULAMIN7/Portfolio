import { getTestimonials } from "@/queries/testimonial";
import TestimonialClientWrapper from "./TestimonialClientWrapper";

export default async function TestimonialList() {
  const testimonials = await getTestimonials();

  return (
    <div className="">
      <TestimonialClientWrapper testimonials={testimonials} />
    </div>
  );
}
