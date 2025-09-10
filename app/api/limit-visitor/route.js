import { Visitor } from "@/model/visitor-model";
import { dbConnect } from "@/service/mongoose";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 5;
    const skip = (page - 1) * limit;

    const totalCount = await Visitor.countDocuments();

    
    if (totalCount === 0) {
      return NextResponse.json({
        visitors: [],
        total: 0,
        message: "No visitors found in database"
      });
    }
    
    const visitors = await Visitor.find()
      .sort({ visitedAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();
    

    
    // Map _id to id for frontend
    const mappedVisitors = visitors.map(v => ({
      ...v,
      id: v._id.toString(),
      ip: v.ip || 'Unknown',
      userAgent: v.userAgent || 'Unknown',
      visitedAt: v.visitedAt || new Date()
    }));
    
    const response = {
      visitors: mappedVisitors,
      total: totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit)
    };
    

    return NextResponse.json(response);
    
  } catch (error) {
  
    return NextResponse.json(
      {
        message: "Failed to fetch visitors",
        error: error.message
      },
      { status: 500 }
    );
  }
}