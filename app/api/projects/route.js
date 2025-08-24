import { Project } from "@/model/project-model";
import { dbConnect } from "@/service/mongoose";
import { NextResponse } from "next/server";



export async function POST(req) {
  try {
    const projectData = await req.json();
    await dbConnect();

    const newProject = new Project(projectData);
    const savedProject = await newProject.save();

    return NextResponse.json({ success: true, project: savedProject });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
