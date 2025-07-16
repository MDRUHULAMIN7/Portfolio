import { Visitor } from "@/model/visitor-model"; // Import the Visitor model
import connectDb from "@/lib/mongodb"; // MongoDB connection handler
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Ensure MongoDB is connected
    await connectDb();

    // Aggregate visitor data by day
    const data = await Visitor.aggregate([
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

    // Return aggregated data
    return NextResponse.json(data);
  } catch (error) {
    // Return error message if aggregation fails
    return NextResponse.json({ error: error.message });
  }
}
