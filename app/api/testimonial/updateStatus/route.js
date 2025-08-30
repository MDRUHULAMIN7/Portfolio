
import { Testimonial } from "@/model/testimonial-model";
import { dbConnect } from "@/service/mongoose";
import { NextResponse } from "next/server";

export async function PATCH(req) {
  try {
    const { id, status } = await req.json();
    await dbConnect();

    const updated = await Testimonial.findByIdAndUpdate(id, { status }, { new: true });
    if (!updated) throw new Error("Testimonial not found");

    return NextResponse.json({ success: true, testimonial: updated });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
