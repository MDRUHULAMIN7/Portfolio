import { auth } from "@/auth";
import SectionWrapper from "@/components/sectionWrapper/SectionWrapper";
import { redirect } from "next/navigation";
import Services from "../services/page";


async function dashboardPage() {

   const session = await auth();

   console.log( session.user?.email)
   
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

    <SectionWrapper>
    <div>dashboardpage</div>
    <Services></Services>
    </SectionWrapper>
  )
}

export default dashboardPage