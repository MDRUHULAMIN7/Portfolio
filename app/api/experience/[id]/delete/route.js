
import { Experience } from "@/model/experience-model";
import { dbConnect } from "@/service/mongoose";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  try {
    const { id } = params;

    await dbConnect();

    const deletedProject = await Experience.findByIdAndDelete(id);

    if (!deletedProject) {
      return NextResponse.json(
        { success: false, error: "Experience not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Experience deleted successfully" }
    );
  } catch (error) {
    console.error("Error deleting Experience:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
