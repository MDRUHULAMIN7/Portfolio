"use client";

import { useState, useEffect } from "react";
import ModalWrapper from "@/components/ModalWrapper";
import { toast } from "react-hot-toast";

export default function AddBlogModal({ isOpen, onClose, onAdd }) {
  const [formData, setFormData] = useState({
    banner: "",
    title: "",
    topic: "",
    description: "",
    readingTime: "",
    status: "Unpublished",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isValid, setIsValid] = useState(false);

  // ✅ hooks must always run, no matter what
  useEffect(() => {
    const { banner, title, topic, description } = formData;
    setIsValid(
      banner.trim() && title.trim() && topic.trim() && description.trim()
    );
  }, [formData]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    try {
      setIsSaving(true);
      const res = await fetch(`/api/blog`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const created = await res.json().catch(() => null);
      setIsSaving(false);

      if (res.ok) {
        toast.success("Blog added successfully.");
        if (onAdd) onAdd(created);
        onClose();
        setFormData({
          banner: "",
          title: "",
          topic: "",
          description: "",
          readingTime: "",
          status: "Unpublished",
        });
      } else {
        toast.error(created?.error || "Failed to add blog.");
      }
    } catch (error) {
      console.error("Failed to add blog:", error);
      setIsSaving(false);
      toast.error("Network error. Please try again!");
    }
  };

  // ✅ render conditionally here
  if (!isOpen) return null;

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-bold text-white mb-4">Add New Blog</h2>

      <div className="space-y-3">
        <input
          type="text"
          name="banner"
          value={formData.banner}
          onChange={handleChange}
          placeholder="Banner Image URL"
          className="w-full p-2 rounded border border-gray-600 bg-gray-800 text-white"
          required
        />

        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Blog Title"
          className="w-full p-2 rounded border border-gray-600 bg-gray-800 text-white"
          required
        />

        <input
          type="text"
          name="topic"
          value={formData.topic}
          onChange={handleChange}
          placeholder="Topic"
          className="w-full p-2 rounded border border-gray-600 bg-gray-800 text-white"
          required
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Blog Description"
          rows={5}
          className="w-full p-2 rounded border border-gray-600 bg-gray-800 text-white"
          required
        />

        <input
          type="number"
          name="readingTime"
          value={formData.readingTime}
          onChange={handleChange}
          placeholder="Reading Time (in minutes)"
          className="w-full p-2 rounded border border-gray-600 bg-gray-800 text-white"
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full p-2 rounded border border-gray-600 bg-gray-800 text-white"
        >
          <option value="Unpublished">Unpublished</option>
          <option value="Published">Published</option>
        </select>
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={onClose}
          disabled={isSaving}
          className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={!isValid || isSaving}
          className={`px-4 py-2 rounded-lg text-white ${
            isValid
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-blue-600 opacity-50 cursor-not-allowed"
          }`}
        >
          {isSaving ? "Saving..." : "Add Blog"}
        </button>
      </div>
    </ModalWrapper>
  );
}
