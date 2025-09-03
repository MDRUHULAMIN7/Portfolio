
import { getBlogs, createBlog } from "@/queries/blog";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const blogs = await getBlogs();
    return res.status(200).json(blogs);
  }

  if (req.method === "POST") {
    const blog = await createBlog(req.body);
    return res.status(201).json(blog);
  }

  return res.status(405).end(); // Method not allowed
}
