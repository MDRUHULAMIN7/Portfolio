"use client";

import { useState } from "react";
import ModalWrapper from "@/components/ModalWrapper";
import { toast } from "react-hot-toast";
import Image from "next/image";

export default function EditBlogModal({ isOpen, blog, onClose, onUpdate }) {
  const [formData, setFormData] = useState(blog || {});
  const [isSaving, setIsSaving] = useState(false);

  if (!isOpen || !blog) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    try {
      setIsSaving(true);

      const res = await fetch(`/api/blog/${blog.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const updated = await res.json();
      setIsSaving(false);

      if (res.ok) {
        toast.success("Blog updated successfully.");
        if (onUpdate) onUpdate(updated);
        onClose();
      } else {
        toast.error(updated.error || "Failed to update blog.");
      }
    } catch (error) {
      console.error("Failed to update blog:", error);
      setIsSaving(false);
      toast.error("Network error. Please try again!");
    }
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-bold text-white mb-4">Edit Blog</h2>

      <div className="space-y-3">
    <p>
  Created at :{" "}
  {formData?.createdAt
    ? new Date(formData.createdAt).toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "N/A"}
</p>

        <input
          type="text"
          name="title"
          value={formData.title || ""}
          onChange={handleChange}
          placeholder="Blog Title"
          className="input-field"
        />
        <input
          type="text"
          name="topic"
          value={formData.topic || ""}
          onChange={handleChange}
          placeholder="Blog Topic"
          className="input-field"
        />
        <Image 
          src={formData.banner || ""}
          alt={formData.title || ""}
          width={300}
          height={400}
          className="object-cover rounded-xl"
        />
        <input
          type="text"
          name="banner"
          value={formData.banner || ""}
          onChange={handleChange}
          placeholder="Blog Banner"
          className="input-field"
        />
        <input
          type="text"
          name="readingTime"
          value={formData.readingTime || ""}
          onChange={handleChange}
          placeholder="Blog Reading Time"
          className="input-field"
        />

        <textarea
          name="description"
          value={formData.description || ""}
          onChange={handleChange}
          placeholder="Blog Description"
          rows={5}
          className="input-field"
        />
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
          disabled={isSaving}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
        >
          {isSaving ? "Updating..." : "Update"}
        </button>
      </div>
    </ModalWrapper>
  );
}
