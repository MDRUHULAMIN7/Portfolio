import { auth } from "@/auth";
import getUserByEmail from "@/queries/users";
import { dbConnect } from "@/service/mongoose";
import { NextResponse } from "next/server";
import { cookies } from "next/headers"; 

export const GET = async (request) => {
  const session = await auth();

  if (!session?.user) {
    return new NextResponse(`You are not authenticated!`, { status: 401 });
  }

  await dbConnect();

  try {
    const user = await getUserByEmail(session.user.email);

    // Cookies access
    const cookieStore = await cookies();
    const allCookies = cookieStore.getAll();

    const lastAccessLocal = user?.lastAccess ;
    const loginTimeLocal = user?.loginTime ;

    



    return new NextResponse(JSON.stringify(user), { status: 200 })

  } catch (err) {
    return new NextResponse(err.message, { status: 500 });
  }
};
