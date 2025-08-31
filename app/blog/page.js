import Heading from "@/components/Heading";
import BlogSlider from "./_components/BlogSlider";


export default async function Blog() {

 const blogs = [
  {
    id: 1,
    banner: "https://res.cloudinary.com/dpomtzref/image/upload/v1756674037/nextjs_uploads/dimqyvpbcuvsoiaeent8.jpg",
    title: "Mastering Next.js 14",
    topic: "Web Development",
    createdAt: "2025-08-01",
    status: "Published",
    description:
 "Web development is one of the fastest-evolving fields in technology. Every year brings new tools, frameworks, and best practices that shape how we build and experience the web. As we step into 2025, let’s explore some of the most exciting trends shaping the future of web development.",
    readingTime: "6 min read",
  },
  {
    id: 2,
    banner: "https://res.cloudinary.com/dpomtzref/image/upload/v1756674037/nextjs_uploads/dimqyvpbcuvsoiaeent8.jpg",
    title: "React Performance Hacks",
    topic: "Frontend",
    createdAt: "2025-07-15",
    status: "Published",
    description:
     "Web development is one of the fastest-evolving fields in technology. Every year brings new tools, frameworks, and best practices that shape how we build and experience the web. As we step into 2025, let’s explore some of the most exciting trends shaping the future of web development.",
    readingTime: "4 min read",
  },
  {
    id: 3,
    banner: "https://res.cloudinary.com/dpomtzref/image/upload/v1756674037/nextjs_uploads/dimqyvpbcuvsoiaeent8.jpg",
    title: "UI/UX Best Practices",
    topic: "Design",
    createdAt: "2025-06-25",
    status: "Unpublished",
    description:
      "Web development is one of the fastest-evolving fields in technology. Every year brings new tools, frameworks, and best practices that shape how we build and experience the web. As we step into 2025, let’s explore some of the most exciting trends shaping the future of web development.",
    readingTime: "5 min read",
  },
  {
    id: 4,
    banner: "https://res.cloudinary.com/dpomtzref/image/upload/v1756674037/nextjs_uploads/dimqyvpbcuvsoiaeent8.jpg",
    title: "Mastering Next.js 14",
    topic: "Web Development",
    createdAt: "2025-08-01",
    status: "Published",
    description:
      "Web development is one of the fastest-evolving fields in technology. Every year brings new tools, frameworks, and best practices that shape how we build and experience the web. As we step into 2025, let’s explore some of the most exciting trends shaping the future of web development.",
    readingTime: "6 min read",
  },
  {
    id: 5,
    banner: "https://res.cloudinary.com/dpomtzref/image/upload/v1756674037/nextjs_uploads/dimqyvpbcuvsoiaeent8.jpg",
    title: "React Performance Hacks",
    topic: "Frontend",
    createdAt: "2025-07-15",
    status: "Published",
    description:
      "Web development is one of the fastest-evolving fields in technology. Every year brings new tools, frameworks, and best practices that shape how we build and experience the web. As we step into 2025, let’s explore some of the most exciting trends shaping the future of web development.",
    readingTime: "4 min read",
  },
  {
    id: 6,
    banner: "https://res.cloudinary.com/dpomtzref/image/upload/v1756674037/nextjs_uploads/dimqyvpbcuvsoiaeent8.jpg",
    title: "UI/UX Best Practices",
    topic: "Design",
    createdAt: "2025-06-25",
    status: "Unpublished",
    description:
    "Web development is one of the fastest-evolving fields in technology. Every year brings new tools, frameworks, and best practices that shape how we build and experience the web. As we step into 2025, let’s explore some of the most exciting trends shaping the future of web development.",
    readingTime: "5 min read",
  },
];



    return(

        <div className="pt-16 px-3">
            <Heading title1="Blogs" title2="Read my latest articles" />
  

   <BlogSlider blogs={blogs} />
        </div>
    )
}