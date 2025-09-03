import { getBlogs, createBlog } from "@/queries/blog";

export async function GET(req) {
  const blogs = await getBlogs();
  return new Response(JSON.stringify(blogs), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(req) {
  try {
    const data = await req.json(); 
    const blog = await createBlog(data);

    return new Response(JSON.stringify(blog), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Failed to create blog:", error);
    return new Response(
      JSON.stringify({ error: "Failed to create blog" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
