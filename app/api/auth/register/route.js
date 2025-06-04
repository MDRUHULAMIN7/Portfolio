

import { User } from "@/model/user-model";
import { dbConnect } from "@/service/mongoose";


import { NextResponse } from "next/server";

export const POST = async (request) => {
  const { fname, lname, email, password } = await request.json();

 

  await dbConnect();



  const newUser = {
    name: `${fname} ${lname}`,
    email,
    password,
  };


  try {
    await User.create(newUser);
    return new NextResponse("User has been created", {
      status: 201,
    });
  } catch (err) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
};