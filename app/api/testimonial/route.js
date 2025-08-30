import { Testimonial } from "@/model/testimonial-model";
import { dbConnect } from "@/service/mongoose";
import { NextResponse } from "next/server";

// CREATE
export async function POST(req) {
  try {
    const testimonialData = await req.json();
    await dbConnect();

    // Check if a review already exists with this email
    const existingReview = await Testimonial.findOne({ email: testimonialData?.email });
    if (existingReview) {
      return NextResponse.json(
        { success: false, error: "You have already submitted a review." },
        { status: 400 }
      );
    }

    // Automatically set status to "pending"
    const newTestimonial = new Testimonial({
      ...testimonialData,
      status: "pending",
    });

    const savedTestimonial = await newTestimonial.save();

    return NextResponse.json({ success: true, testimonial: savedTestimonial });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}


// DELETE
export async function DELETE(req) {
  try {
    const { id } = await req.json();
    await dbConnect();

    const deletedTestimonial = await Testimonial.findByIdAndDelete(id);

    if (!deletedTestimonial) {
      return NextResponse.json(
        { success: false, error: "Testimonial not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Review deleted successfully" });
  } catch (error) {
    console.error("Error deleting review:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
