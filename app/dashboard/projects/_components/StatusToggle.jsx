"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function StatusToggle({ projectId, currentStatus }) {
  const [status, setStatus] = useState(currentStatus);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusToggle = async () => {
    const newStatus = status === "publish" ? "unpublish" : "publish";
    setIsUpdating(true);

    try {
      const response = await fetch(`/api/projects/${projectId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus(newStatus);
        toast.success(`Status updated to "${newStatus}"`); // ✅ success toast
      } else {
        const errorMessage = data.message || "Failed to update status";
        toast.error(errorMessage); // ❌ error toast
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <button
      onClick={handleStatusToggle}
      disabled={isUpdating}
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200 ${
        isUpdating
          ? "opacity-50 cursor-not-allowed"
          : "cursor-pointer hover:opacity-80"
      } ${
        status === "publish"
          ? "bg-green-900 text-green-400 border border-green-700"
          : "bg-gray-700 text-gray-400 border border-gray-600"
      }`}
    >
      {isUpdating && (
        <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-current mr-1"></div>
      )}
      {isUpdating
        ? "Updating..."
        : status === "publish"
        ? "Published"
        : "Unpublished"}
    </button>
  );
}
