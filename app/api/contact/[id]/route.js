import { NextResponse } from "next/server";
import { dbConnect } from "@/service/mongoose";
import { Message } from "@/model/message-model";

export async function DELETE(req, { params }) {
  try {
    await dbConnect();
    const { id } = params;
    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }
    await Message.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
