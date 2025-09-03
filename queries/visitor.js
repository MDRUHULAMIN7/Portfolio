import { replaceMongoIdInArray } from "@/lib/convertData";
import { Visitor } from "@/model/visitor-model";

export async function getAllVisitors() {
  const visitorsData = await Visitor?.find()?.lean();
  return replaceMongoIdInArray(visitorsData);
}
export async function deleteVisitor(id) {
  try {
    const result = await Visitor.findByIdAndDelete(id)
    return result
  } catch (error) {
    console.error('Error deleting visitor:', error)
    throw error
  }
}

export async function createVisitor(visitorData) {
  try {
    const visitor = new Visitor(visitorData)
    await visitor.save()
    return {
      id: visitor._id.toString(),
      ip: visitor.ip,
      userAgent: visitor.userAgent,
      visitedAt: visitor.visitedAt,
      __v: visitor.__v
    }
  } catch (error) {
    console.error('Error creating visitor:', error)
    throw error
  }
}