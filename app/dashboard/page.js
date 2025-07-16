import { auth } from "@/auth";
import SectionWrapper from "@/components/sectionWrapper/SectionWrapper";
import { redirect } from "next/navigation";
import Services from "../services/page";
import Overviewpage from "./overview/page";


async function dashboardPage() {

   const session = await auth();

   console.log( session.user?.email)
  const response = await fetch("/api/visitor-data");
  //  Create this route
const data = await response?.json();
// Aggregate by day using MongoDB pipeline
console.log(data);

  // Check if the user is authenticated and has the correct role

   
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
    <div>

      <Overviewpage></Overviewpage>
    </div>
    <Services></Services>
    </SectionWrapper>
  )
}

export default dashboardPage