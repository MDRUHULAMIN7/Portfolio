import { dbConnect } from "@/service/mongoose";
import { Avatar } from "@/model/avatar-model";

export async function GET(req) {
  await dbConnect();
  const avatar = await Avatar.findOne().lean();
  return new Response(JSON.stringify({ resume: avatar?.resume || "" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function PATCH(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const { resume } = body;

    if (!resume) return new Response("Resume link is required", { status: 400 });

    const avatar = await Avatar.findOne();
    if (!avatar) {
      return new Response("Avatar not found", { status: 404 });
    }

    avatar.resume = resume;
    await avatar.save();

    return new Response(JSON.stringify({ resume: avatar.resume }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(err.message, { status: 500 });
  }
}
