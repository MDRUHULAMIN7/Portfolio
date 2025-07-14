import { Visitor } from "@/model/visitor-model";  // Import the Visitor model
import { NextResponse } from "next/server";

export async function POST(req) {
  // Get IP address from headers
  const ip = req.headers.get("x-forwarded-for") || req.headers.get("host") || "unknown";

  // Get user-agent from headers
  const userAgent = req.headers.get("user-agent") || "unknown";

  try {
    // Save the visitor data to MongoDB for every visit
    await Visitor.create({ ip, userAgent });

    // Return success response
    return NextResponse.json({ success: true });
  } catch (error) {
    // Return error response in case of failure
    return NextResponse.json({ success: false, error: error.message });
  }
}

