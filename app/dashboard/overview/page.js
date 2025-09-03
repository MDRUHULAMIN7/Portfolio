
import { getAllVisitors } from "@/queries/visitor"
import { dbConnect } from "@/service/mongoose"
import VisitorsTable from './_components/VisitorTable'


export default async function OverviewPage() {

    await dbConnect()
  const visitors =  await getAllVisitors()
  return (
    <div className="">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-100 mb-2">
            Visitors Overview
          </h1>
          <p className="text-gray-100">
            Total visitors: {visitors.length}
          </p>
        </div>

        <VisitorsTable 
          visitorsData={visitors}
  
        />
      </div>
    </div>
  )
}