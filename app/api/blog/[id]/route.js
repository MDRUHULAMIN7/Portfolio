import { getBlogById, updateBlog, deleteBlog } from "@/queries/blog";

export async function GET(req, { params }) {
  const blog = await getBlogById(params.id);
  return Response.json(blog);
}

export async function PUT(req, { params }) {
  const body = await req.json();
  const blog = await updateBlog(params.id, body);
  return Response.json(blog);
}

export async function DELETE(req, { params }) {
  await deleteBlog(params.id);
  return Response.json({ success: true });
}
