
import { auth } from "@/auth";
import Overviewpage from "./overview/page";
import { dbConnect } from "@/service/mongoose";
import { redirect } from "next/navigation";


async function dashboardPage() {

  await dbConnect();

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/visitor-data`);

const data = await response?.json();
 const session = await auth();

   
if (
  !session
   ||
  session.user?.email !== 'ruhulthisis@gmail.com'
  //   ||
  // session.user?.role !== 'admin'
) {
  redirect("/login");
}
  return (

  
      <Overviewpage></Overviewpage>
    

  )
}

export default dashboardPage