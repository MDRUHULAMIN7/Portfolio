
import { auth } from "@/auth";
import Overviewpage from "./overview/page";
import { redirect } from "next/navigation";


async function dashboardPage() {
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
