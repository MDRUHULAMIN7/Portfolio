
import { replaceMongoIdInObject,replaceMongoIdInArray } from "@/lib/convertData";
import { Blog } from "@/model/blog-model";

// GET all blogs
export async function getBlogs() {

  const blogData = await Blog?.find()?.lean();
  return replaceMongoIdInArray(blogData)
}
// GET only published blogs
export async function getPublishedBlogs() {
  const blogs = await Blog.find({ status: "Published" }).lean();
  return replaceMongoIdInArray(blogs);
}

// GET single blog by id
export async function getBlogById(id) {
  const blog = await Blog.findById(id).lean();
  return replaceMongoIdInObject(blog);
}

// CREATE blog
export async function createBlog(data) {
  const blog = new Blog(data);
  await blog.save();
  return replaceMongoIdInObject(blog);
}

// UPDATE blog
export async function updateBlog(id, data) {
  const blog = await Blog.findByIdAndUpdate(id, data, { new: true }).lean();
  return replaceMongoIdInObject(blog);
}

// DELETE blog
export async function deleteBlog(id) {
  await Blog.findByIdAndDelete(id);
  return { success: true };
}
