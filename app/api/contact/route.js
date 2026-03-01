import { NextResponse } from "next/server";
import { dbConnect } from "@/service/mongoose";
import { Message } from "@/model/message-model";

function isValidEmail(email) {
  return /.+\@.+\..+/.test(email);
}
function isValidPhone(phone) {
  return /^[+]?[\d\s\-()]{8,20}$/.test(phone);
}

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const { firstName, lastName, email, phone, subject, message } = body || {};

    if (
      !firstName?.trim() ||
      !lastName?.trim() ||
      !email?.trim() ||
      !phone?.trim() ||
      !subject?.trim() ||
      !message?.trim()
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 },
      );
    }
    if (!isValidPhone(phone)) {
      return NextResponse.json(
        { error: "Invalid phone number" },
        { status: 400 },
      );
    }

    const count = await Message.countDocuments({
      $or: [{ email: email.toLowerCase() }, { phone }],
    });
    if (count >= 3) {
      return NextResponse.json(
        { error: "Limit reached. You can send up to 3 messages." },
        { status: 429 },
      );
    }

    const saved = await Message.create({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.trim(),
      subject: subject.trim(),
      message: message.trim(),
    });

    return NextResponse.json(
      { success: true, id: saved._id.toString() },
      { status: 201 },
    );
  } catch (err) {
    return NextResponse.json(
      { error: err.message || "Something went wrong" },
      { status: 500 },
    );
  }
}

export async function GET(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 10);
    const skip = (page - 1) * limit;

    const [total, items] = await Promise.all([
      Message.countDocuments(),
      Message.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    ]);

    const data = items.map((m) => ({
      id: m._id.toString(),
      firstName: m.firstName,
      lastName: m.lastName,
      email: m.email,
      phone: m.phone,
      subject: m.subject,
      message: m.message,
      createdAt: m.createdAt,
    }));

    return NextResponse.json({
      total,
      page,
      limit,
      items: data,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
