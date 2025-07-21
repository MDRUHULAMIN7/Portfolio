import { Visitor } from "@/model/visitor-model";
import { dbConnect } from "@/service/mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return NextResponse.json(
        { success: false, error: "Invalid content-type" },
        { status: 400 }
      );
    }

    const body = await req.json(); // Will succeed only if the body is valid JSON
    const { ip, userAgent } = body;

    await dbConnect();
    await Visitor
    .create({ ip, userAgent });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving visitor:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
