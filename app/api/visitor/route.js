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

    const body = await req.json();
    const { ip, userAgent } = body;

    await dbConnect();

  
const existingVisitor = await Visitor.findOne({ $or: [{ ip }, { userAgent }] });


    if (existingVisitor) {

      return NextResponse.json({ success: true, message: "Alredy Visited" });
    }else{
    

    // Otherwise create new record
    await Visitor.create({ ip, userAgent });

    return NextResponse.json({ success: true, message: "Visitor logged" });
    }


  } catch (error) {
    console.error("Error saving visitor:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
