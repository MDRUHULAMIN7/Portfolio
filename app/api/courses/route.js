
import { Course } from "@/model/course-model";
import { dbConnect } from "@/service/mongoose";
import { NextResponse } from "next/server";


// POST new course
export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    
   
    const requiredFields = ['title', 'from', 'time', 'credentials',  'description'];
    const missingFields = requiredFields.filter(field => !body[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }
    
    const newCourse = new Course(body);
    console.log(newCourse, 'new course');
    const savedCourse = await newCourse.save();
    
    // Convert the MongoDB document to a plain JavaScript object and handle the _id
    const courseObj = savedCourse.toObject();
    courseObj._id = courseObj._id.toString();
    
    return NextResponse.json(courseObj, { status: 201 });
  } catch (error) {
    console.error('Error adding course:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
   
  }
}


