import { NextResponse } from "next/server";
import { getProjectById } from "@/queries/project";
import { dbConnect } from "@/service/mongoose";

export async function GET(req, { params }) {
  try {
    await dbConnect();
    const { id } = params;
    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      return NextResponse.json(
        { error: "Invalid project id" },
        { status: 400 },
      );
    }
    const project = await getProjectById(id);
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    return NextResponse.json(project);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
