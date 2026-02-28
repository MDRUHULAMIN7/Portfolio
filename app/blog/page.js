import Heading from "@/components/Heading";
import BlogSliderLazy from "./_components/BlogSliderLazy";
import { getBlogs } from "@/queries/blog";

export default async function Blog() {
  const blogs = await getBlogs();

  return (
    <div className="pt-16 pb-10 px-3 ">
      <Heading title1="Blogs" title2="Read my latest articles" />

      <BlogSliderLazy blogs={blogs} />
    </div>
  );
}
