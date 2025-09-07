"use client";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function EditCourseModal({ course, onClose, onSuccess }) {
  const [form, setForm] = useState({
    title: course.title,
    from: course.from,
    time: course.time,
    credentials: course.credentials,
    description: course.description,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(`/api/courses/${course.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to update course");
      const updatedCourse = await res.json();

      onSuccess(updatedCourse);
      toast.success("Course updated successfully!");
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update course");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-3">
      <h2 className="text-lg font-semibold">Edit Course</h2>
      <input
        type="text"
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
        className="w-full border px-3 py-2 rounded"
        required
      />
      <input
        type="text"
        name="from"
        value={form.from}
        onChange={handleChange}
        placeholder="From"
        className="w-full border px-3 py-2 rounded"
        required
      />
      <input
        type="text"
        name="time"
        value={form.time}
        onChange={handleChange}
        placeholder="Time"
        className="w-full border px-3 py-2 rounded"
        required
      />
      <input
        type="text"
        name="credentials"
        value={form.credentials}
        onChange={handleChange}
        placeholder="Credentials"
        className="w-full border px-3 py-2 rounded"
        required
      />
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full border px-3 py-2 rounded"
        rows="3"
        required
      />

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded bg-gray-500 text-white"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 rounded bg-cyan-600 text-gray-900"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
}
