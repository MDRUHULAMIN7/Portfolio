
import { Social } from "@/model/social-model";
import { dbConnect } from "@/service/mongoose";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {

  try {
    await dbConnect();
    const body = await req.json();

    const updated = await Social.findByIdAndUpdate(params.id, body, {
      new: true,
    });

    if (!updated) {
      return NextResponse.json({ error: "Social not found" }, { status: 404 });
    }

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error("Error updating socials:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
