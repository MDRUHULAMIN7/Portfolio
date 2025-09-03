
import { NextResponse } from 'next/server'

import { deleteVisitor } from "@/queries/visitor"

export async function DELETE(request, { params }) {
  try {
    const { id } = params
    
   
    const result = await deleteVisitor(id)
    
    if (!result) {
      return NextResponse.json(
        { message: 'Visitor not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(
      { message: 'Visitor deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error deleting visitor:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}