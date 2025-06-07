

import { Visitor } from "@/model/visitor-model";
import { NextResponse } from "next/server";

export async function POST(req) {
  const ip =
    req.headers.get("x-forwarded-for") || req.headers.get("host") || "unknown";
  const userAgent = req.headers.get("user-agent") || "unknown";

  try {
    await Visitor.create({ ip, userAgent });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
