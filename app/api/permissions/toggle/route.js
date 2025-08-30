import { NextResponse } from "next/server";
import { dbConnect } from "@/service/mongoose";
import { Permissions } from "@/model/permissions-model";


export async function PATCH(req) {
  await dbConnect();
  try {
    const { id, field, value } = await req.json();

    // Validate field exists in model
    const allowedFields = ["login", "register", "addReview", "seeVisitors"];
    if (!allowedFields.includes(field)) {
      return NextResponse.json({ success: false, error: "Invalid field" }, { status: 400 });
    }

    const updated = await Permissions.findByIdAndUpdate(
      id,
      { [field]: value },
      { new: true, upsert: true } // upsert: create if not exists
    ).lean();

    return NextResponse.json({ success: true, updated });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
