"use client";

import ModalWrapper from "@/components/ModalWrapper";

export default function DeleteConfirmModal({ isOpen, project, onClose, onDelete }) {
  // Local handler for confirm action
  const handleConfirm = async () => {
    if (!project) return;
    try {
      // 🔥 your delete logic goes here
      console.log("Deleting project:", project.id);

      // If parent needs to know after delete → callback
      if (onDelete) {
        await onDelete(project);
      }

      // Close modal after success
      onClose();
    } catch (error) {
      console.error("Failed to delete project:", error);
    }
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">Confirm Delete</h3>
      </div>

      <p className="text-gray-300 mb-2">
        Are you sure you want to delete this?
      </p>

      <div className="bg-gray-800 p-3 rounded-lg mb-6">
        <p className="text-cyan-400 font-medium">{project?.title}</p>
        <p className="text-gray-400 text-sm mt-1">
          {project?.meta?.type}
        </p>
      </div>

      <p className="text-red-400 text-sm mb-6">
        This action cannot be undone.
      </p>

      <div className="flex gap-3">
        <button
          onClick={onClose}
          className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200"
        >
          Cancel
        </button>
        <button
          onClick={handleConfirm}
          className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
        >
          Delete
        </button>
      </div>
    </ModalWrapper>
  );
}
