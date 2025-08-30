
import { Experience } from "@/model/experience-model";
import { dbConnect } from "@/service/mongoose";
import { NextResponse } from "next/server";


export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();

    const newExperience = await Experience.create(body);

    return NextResponse.json(newExperience, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
