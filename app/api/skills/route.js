import { Skill } from "@/model/skill-model";
import { dbConnect } from "@/service/mongoose";
import { NextResponse } from "next/server";


export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
     
    const requiredFields = ["title", "version", "icon", "color", "bgHover"];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ error: `${field} is required` }, { status: 400 });
      }
    }

    const newSkill = new Skill(body);

    await newSkill.save();
    return NextResponse.json(newSkill, { status: 201 });
  } catch (err) {
    console.error("POST /api/skills error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
