import { NextResponse } from "next/server";
import { dbConnect } from "@/service/mongoose";
import { Project } from "@/model/project-model";

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const items = Array.isArray(body?.items) ? body.items : [];
    if (!items.length) {
      return NextResponse.json({ success: false, error: "No items provided" }, { status: 400 });
    }

    const bulk = items.map(({ id, order }) => ({
      updateOne: {
        filter: { _id: id },
        update: { $set: { order } },
      },
    }));
    const result = await Project.bulkWrite(bulk, { ordered: false });
    return NextResponse.json({ success: true, result });
  } catch (e) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}
