"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import DeleteBlogModal from "./DeleteBlogModal";
import EditBlogModal from "./EditBlogModal";
import AddBlogModal from "./AddBlogModal";
import { Eye, Trash } from "lucide-react";

export default function BlogTable({ blogsData }) {
  const [blogs, setBlogs] = useState(blogsData);
  const [selected, setSelected] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [loadingStatusId, setLoadingStatusId] = useState(null);

  async function toggleStatus(blog) {
    try {
      setLoadingStatusId(blog.id);

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
    } catch (error) {
      console.error("Failed to update status:", error);
      toast.error("Failed to update status");
    } finally {
      setLoadingStatusId(null);
    }
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white">Blogs</h2>
        <button
          onClick={() => setAddModal(true)}
          className="px-4 py-2 bg-cyan-400 text-gray-900 rounded-xl hover:bg-cyan-600 transition"
        >
          + Add Blog
        </button>
      </div>

      {/* Table for md+ screens */}
      <div className="hidden md:block overflow-x-auto rounded-lg bg-gray-800 shadow-md">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-200 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-200 uppercase tracking-wider">Topic</th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-gray-200 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-gray-200 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {blogs.map((blog, idx) => (
              <tr key={blog?.id} className={`${idx % 2 === 0 ? "bg-gray-800" : "bg-gray-700"} hover:bg-gray-600 transition`}>
                <td className="px-6 py-4 text-white">{blog?.title}</td>
                <td className="px-6 py-4 text-gray-300">{blog?.topic}</td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => toggleStatus(blog)}
                    className={`px-3 py-1 rounded-full text-white font-medium flex items-center justify-center gap-2 transition ${
                      blog?.status === "Published" ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"
                    }`}
                    disabled={loadingStatusId === blog.id}
                  >
                    {loadingStatusId === blog.id ? (
                      <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                    ) : blog?.status}
                  </button>
                </td>
                <td className="px-6 py-4 text-center flex justify-center gap-4">
                  <button
                    onClick={() => { setSelected(blog); setModalOpen(true); }}
                    className="text-cyan-400 hover:text-cyan-500 transition"
                  >
                    <Eye size={20} />
                  </button>
                  <button
                    onClick={() => { setSelected(blog); setDeleteModal(true); }}
                    className="text-red-500 hover:text-red-600 transition"
                  >
                    <Trash size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards for mobile */}
      <div className="md:hidden space-y-4">
        {blogs.map((blog) => (
          <div key={blog?.id} className="bg-gray-800 p-4 rounded-lg shadow hover:bg-gray-700 transition">
            <h3 className="text-white font-bold text-lg">{blog?.title}</h3>
            <p className="text-gray-300 mb-2">{blog?.topic}</p>
            <div className="flex justify-between items-center">
              <button
                onClick={() => toggleStatus(blog)}
                className={`px-3 py-1 rounded-full text-white font-medium ${
                  blog?.status === "Published" ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"
                }`}
                disabled={loadingStatusId === blog.id}
              >
                {loadingStatusId === blog.id ? (
                  <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                ) : blog?.status}
              </button>
              <div className="flex gap-3">
                <button
                  onClick={() => { setSelected(blog); setModalOpen(true); }}
                  className="text-cyan-400 hover:text-cyan-500 transition"
                >
                  <Eye size={20} />
                </button>
                <button
                  onClick={() => { setSelected(blog); setDeleteModal(true); }}
                  className="text-red-500 hover:text-red-600 transition"
                >
                  <Trash size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Blog Modal */}
      <AddBlogModal
        isOpen={addModal}
        onClose={() => setAddModal(false)}
        onAdd={(newBlog) => setBlogs((prev) => [newBlog, ...prev])}
      />

      {/* Edit Blog Modal */}
      {modalOpen && selected && (
        <EditBlogModal
          isOpen={modalOpen}
          blog={selected}
          onClose={() => setModalOpen(false)}
          onUpdate={(updatedBlog) =>
            setBlogs((prev) => prev.map((b) => (b.id === updatedBlog.id ? updatedBlog : b)))
          }
        />
      )}

      {/* Delete Blog Modal */}
      <DeleteBlogModal
        isOpen={deleteModal}
        blog={selected}
        onClose={() => setDeleteModal(false)}
        onDelete={(deletedBlog) => setBlogs((prev) => prev.filter((b) => b.id !== deletedBlog.id))}
      />
    </div>
  );
}
