"use client";

import { useState } from "react";
import ModalWrapper from "@/components/ModalWrapper";
import { toast } from "react-hot-toast";

export default function DeleteBlogModal({ isOpen, blog, onClose, onDelete }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirm = async () => {
    if (!blog) return;

    try {
      setIsDeleting(true);

      const res = await fetch(`/api/blog/${blog.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      setIsDeleting(false);

      if (res.ok) {
        toast.success("Blog deleted successfully.");
        if (onDelete) await onDelete(blog);
        onClose();
      } else {
        toast.error(data.error || "Failed to delete blog.");
      }
    } catch (error) {
      console.error("Failed to delete blog:", error);
      setIsDeleting(false);
      toast.error("Network error. Please try again!");
    }
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">Confirm Delete</h3>
      </div>

      <p className="text-gray-300 mb-3">
        Are you sure you want to delete this blog?
      </p>

      <div className="bg-gray-800 p-3 rounded-lg mb-6">
        <p className="text-cyan-400 font-medium">{blog?.title}</p>
        <p className="text-gray-400 text-sm mt-1">{blog?.topic}</p>
      </div>

      <p className="text-red-400 text-sm mb-6">
        This action cannot be undone.
      </p>

      <div className="flex gap-3">
        <button
          onClick={onClose}
          disabled={isDeleting}
          className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          onClick={handleConfirm}
          disabled={isDeleting}
          className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </ModalWrapper>
  );
}
