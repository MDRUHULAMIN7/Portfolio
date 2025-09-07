
import { Course } from "@/model/course-model";
import { dbConnect } from "@/service/mongoose";
import { NextResponse } from "next/server";


// PUT course
export async function PUT(req, { params }) {
  await dbConnect();
  const body = await req.json();
  const updated = await Course.findByIdAndUpdate(params.id, body, { new: true });
  return NextResponse.json(updated);
}


// DELETE course
export async function DELETE(req, { params }) {
  await dbConnect();
  await Course.findByIdAndDelete(params.id);
  return NextResponse.json({ id: params.id });
}
