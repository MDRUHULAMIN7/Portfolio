// import { auth } from "@/auth";

// import { redirect } from "next/navigation";
import Services from "../services/page";
import Overviewpage from "./overview/page";

// import { dbConnect } from "@/service/mongoose";


async function dashboardPage() {

  // await dbConnect();

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/visitor-data`);

const data = await response?.json();

console.log(data);

//   // Check if the user is authenticated and has the correct role

   
// if (
//   !session
//    ||
//   session.user?.email !== 'ruhulthisis@gmail.com'
//   //   ||
//   // session.user?.role !== 'admin'
// ) {
//   redirect("/login");
// }
  return (

<div className=" ">   
    <div className=" ">

      <Overviewpage></Overviewpage>
    </div>
    <Services></Services>
  </div>
  )
}

export default dashboardPage