"use client";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function DeleteCourseModal({ course, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/courses/${course.id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete course");

      onSuccess(course._id);
      toast.success("Course deleted successfully!");
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete course");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">
        Are you sure you want to delete{" "}
        <span className="text-red-500">{course.title}</span>?
      </h2>
      <div className="flex justify-end gap-2">
        <button
          onClick={onClose}
          className="px-4 py-2 rounded bg-gray-500 text-white"
        >
          Cancel
        </button>
        <button
          onClick={handleDelete}
          disabled={loading}
          className="px-4 py-2 rounded bg-red-600 text-white"
        >
          {loading ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
}
