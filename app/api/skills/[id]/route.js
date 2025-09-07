import { Skill } from "@/model/skill-model";
import { dbConnect } from "@/service/mongoose";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  await dbConnect();
  const body = await req.json();
  const updated = await Skill.findByIdAndUpdate(params.id, body, { new: true });
  return NextResponse.json(updated);
}

export async function DELETE(req, { params }) {
  await dbConnect();
  await Skill.findByIdAndDelete(params.id);
  return NextResponse.json({ message: "Skill deleted" }, { status: 200 });
}
