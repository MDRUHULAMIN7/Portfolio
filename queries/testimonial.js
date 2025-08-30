import { replaceMongoIdInArray } from "@/lib/convertData";
import { Testimonial } from "@/model/testimonial-model";

export async function getTestimonials() {
  const testimonialsData = await Testimonial.find({ status: "approved" }).lean();
  return replaceMongoIdInArray(testimonialsData);
}
export async function getAllTestimonials() {
  const testimonialsData = await Testimonial?.find()?.lean();
  return replaceMongoIdInArray(testimonialsData);
}

