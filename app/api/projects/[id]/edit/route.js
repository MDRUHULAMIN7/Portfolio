

import { Project } from "@/model/project-model";
import { dbConnect } from "@/service/mongoose";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  const { id } = params;

  try {
    const projectData = await req.json();
    await dbConnect();

    // Update project by id
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { $set: projectData },
      { new: true, runValidators: true }
    );

    if (!updatedProject) {
      return NextResponse.json(
        { success: false, message: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, project: updatedProject });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
