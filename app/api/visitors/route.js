import { Visitor } from "@/model/visitor-model";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const year = searchParams.get("year");
    const month = searchParams.get("month");

    if (!year) {
      return NextResponse.json(
        { error: "Year parameter is required" },
        { status: 400 }
      );
    }

    const y = Number(year);
    let startDate;
    let endDate;

    if (!month) {
      startDate = new Date(y, 0, 1);
      endDate = new Date(y, 11, 31, 23, 59, 59, 999);
    } else {
      const m = Number(month) - 1;
      startDate = new Date(y, m, 1);
      endDate = new Date(y, m + 1, 0, 23, 59, 59, 999);
    }

    const visitors = await Visitor.find({
      visitedAt: { $gte: startDate, $lte: endDate },
    }).lean();

    const formatted = visitors.map((v) => ({
      id: v._id.toString(),
      ip: v.ip,
      userAgent: v.userAgent,
      visitedAt: v.visitedAt,
    }));

    return NextResponse.json(formatted);
  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
