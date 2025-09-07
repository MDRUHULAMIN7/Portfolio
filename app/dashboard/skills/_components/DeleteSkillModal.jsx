"use client";
import { toast } from "react-hot-toast";

export default function DeleteSkillModal({ skill, onClose, onSuccess }) {
  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/skills/${skill.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete skill");
      toast.success("Skill deleted!");
      onSuccess && onSuccess(skill.id);
      onClose();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-red-400">Delete Skill</h2>
      <p>Are you sure you want to delete <strong>{skill.title}</strong>?</p>
      <div className="flex gap-2">
        <button onClick={handleDelete} className="bg-red-600 px-4 py-2 rounded text-white">Delete</button>
        <button onClick={onClose} className="bg-gray-700 px-4 py-2 rounded text-white">Cancel</button>
      </div>
    </div>
  );
}
