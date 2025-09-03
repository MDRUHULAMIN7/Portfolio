import { getBlogs } from "@/queries/blog";
import { dbConnect } from "@/service/mongoose";
import BlogTable from "./BlogTable";



export default async function BlogPage() {
    dbConnect()
    const blogs = await getBlogs();
  
  return (
    <div> blog page

        <BlogTable blogsData={blogs}></BlogTable>
    </div>
  )
}
