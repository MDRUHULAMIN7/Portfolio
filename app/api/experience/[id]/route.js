
import { Experience } from "@/model/experience-model";
import { dbConnect } from "@/service/mongoose";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  try {
    await dbConnect();
    const body = await req.json();

    const updated = await Experience.findByIdAndUpdate(
      params.id,
      body,
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ error: "Experience not found" }, { status: 404 });
    }

    return NextResponse.json(updated, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
