
import { Visitor } from "@/model/visitor-model";
import { dbConnect } from "@/service/mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();

    const visitorsByDate = await Visitor.aggregate([
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$visitedAt" }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    return NextResponse.json(visitorsByDate);
  } catch (error) {
    console.error("Visitor aggregation error:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch visitor stats." },
      { status: 500 }
    );
  }
}
