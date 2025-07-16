import { Visitor } from "@/model/visitor-model";
import { dbConnect } from "@/service/mongoose";


export async function POST(req) {
  const { ip, userAgent } = await req.json();

  try {
    await dbConnect();
    await Visitor.create({ ip, userAgent });
    return Response.json({ success: true });
  } catch (error) {
    console.error('Error saving visitor:', error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
