
import { getAllVisitors } from "@/queries/visitor"
import { dbConnect } from "@/service/mongoose"



export default async function OverviewPage() {

    await dbConnect()
  const visitors =  await getAllVisitors()
  console.log(visitors)
  return (
    
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
     
           OverviewPage


      </div>
    
  )
}