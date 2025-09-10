import Heading from "@/components/Heading";
import BlogSlider from "./_components/BlogSlider";
import { getBlogs } from "@/queries/blog";
import { dbConnect } from "@/service/mongoose";


export default async function Blog() {
await dbConnect()
const blogs = await getBlogs()
  

    return(

        <div className="pt-16 pb-10 px-3 ">
            <Heading title1="Blogs" title2="Read my latest articles" />
  

   <BlogSlider blogs={blogs} />
        </div>
    )
}