
import { Project } from "@/model/project-model";
import { dbConnect } from "@/service/mongoose";
import { NextResponse } from "next/server";

export async function PATCH(req, context) {
  try {
    await dbConnect();

    // ✅ Await params
    const { id } = await context.params;
   
    // Add validation for MongoDB ObjectId format
    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      return NextResponse.json(
        { success: false, message: "Invalid project ID format" },
        { status: 400 }
      );
    }

    const { status } = await req.json();
 console.log(status)
    if (!["publish", "unpublish"].includes(status)) {
      return NextResponse.json(
        { success: false, message: "Invalid status value" },
        { status: 400 }
      );
    }

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).select("status");

    if (!updatedProject) {
      return NextResponse.json(
        { success: false, message: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Project status updated successfully",
      project: updatedProject,
    });
  } catch (error) {
    console.error("Error updating project status:", error);
    return NextResponse.json(
      { success: false, message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}