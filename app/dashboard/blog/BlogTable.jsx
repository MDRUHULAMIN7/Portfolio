"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import DeleteBlogModal from "./DeleteBlogModal";

export default function BlogTable({blogsData}) {
  const [blogs, setBlogs] = useState(blogsData);
  const [selected, setSelected] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  console.log(blogs,"blogs")

  async function toggleStatus(blog) {
    const updatedBlog = {
      ...blog,
      status: blog?.status === "Published" ? "Unpublished" : "Published",
    };

    const res = await fetch(`/api/blog/${blog.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedBlog),
    });

    const data = await res.json();
    toast.success("Status updated");
    setBlogs((prev) => prev.map((b) => (b.id === blog.id ? data : b)));
  }

  async function updateBlog(data) {
    const res = await fetch(`/api/blog/${data.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const updated = await res.json();
    toast.success("Blog updated");
    setBlogs((prev) => prev.map((b) => (b.id === data.id ? updated : b)));
    setModalOpen(false);
  }

  async function deleteBlog(id) {
    await fetch(`/api/blog/${id}`, { method: "DELETE" });
    toast.success("Blog deleted");
    setBlogs((prev) => prev.filter((b) => b.id !== id));
    setDeleteModal(false);
  }

  return (
    <div className="p-4">
      <table className="w-full bg-gray-700">
        <thead>
          <tr className="">
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Topic</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog?.id} className="">
              <td className="p-2 border">{blog?.title}</td>
              <td className="p-2 border">{blog?.topic}</td>
              <td className="p-2 border">
                <button
                  onClick={() => toggleStatus(blog)}
                  className={`px-2 py-1 rounded ${
                    blog?.status === "Published"
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {blog?.status}
                </button>
              </td>
              <td className="p-2 border space-x-2">
                <button
                  onClick={() => {
                    setSelected(blog);
                    setModalOpen(true);
                  }}
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                >
                  Details
                </button>
                <button
                  onClick={() => {
                    setSelected(blog);
                    setDeleteModal(true);
                  }}
                  className="bg-red-600 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Details / Edit Modal */}
      {modalOpen && selected && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white p-4 rounded w-1/2">
            <h2 className="text-xl font-bold mb-2">Edit Blog</h2>
            <input
              type="text"
              value={selected?.title}
              onChange={(e) =>
                setSelected({ ...selected, title: e.target.value })
              }
              className="border p-2 w-full mb-2"
            />
            <textarea
              value={selected?.description}
              onChange={(e) =>
                setSelected({ ...selected, description: e.target.value })
              }
              className="border p-2 w-full mb-2"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => updateBlog(selected)}
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
    <DeleteBlogModal
  isOpen={deleteModal}
  blog={selected}
  onClose={() => setDeleteModal(false)}
  onDelete={(deletedBlog) => {
    setBlogs((prev) => prev.filter((b) => b.id !== deletedBlog.id));
  }}
/>

    </div>
  );
}
