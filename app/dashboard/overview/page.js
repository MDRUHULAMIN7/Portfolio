import Heading from "@/components/Heading";
import OverviewCards from "./_components/OverviewCards";


export default async function OverviewPage() {


  return (
    
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
     
          <Heading title1="Dashboard Overview" title2={'Here’s a quick look at your Portfolio'} />

          <OverviewCards />
      </div>
    
  )
}