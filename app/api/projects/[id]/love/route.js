import { Project } from "@/model/project-model";
import { dbConnect } from "@/service/mongoose";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  await dbConnect();

  try {
    const { id } = params;
    const { loves } = await req.json();


    const project = await Project.findById(id);
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    project.meta.loves = loves; 
    await project.save();

    return NextResponse.json({ success: true, loves: project.meta.loves });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
