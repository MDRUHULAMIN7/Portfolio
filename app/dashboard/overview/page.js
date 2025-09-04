
import { getAllVisitors } from "@/queries/visitor"
import { dbConnect } from "@/service/mongoose"
import VisitorsTable from './_components/VisitorTable'
import VisitorsChart from "./_components/VisitorsChart"


export default async function OverviewPage() {

    await dbConnect()
  const visitors =  await getAllVisitors()
  console.log(visitors)
  return (
    
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
     


        <VisitorsChart/>
           <div className="my-8">
       
          <p className="text-gray-100">
            Total visitors: {visitors.length}
          </p>
        </div>
        <VisitorsTable 
          visitorsData={visitors}
  
        />

      </div>
    
  )
}