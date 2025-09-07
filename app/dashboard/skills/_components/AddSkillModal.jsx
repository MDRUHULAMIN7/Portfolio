"use client";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

export default function AddSkillModal({ onClose, onSuccess }) {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await fetch("/api/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, updatedDate: new Date() }),
      });
      if (!res.ok) throw new Error("Failed to add skill");
      const newSkill = await res.json();
      toast.success("Skill added successfully!");
      reset();
      onSuccess && onSuccess(newSkill);
      onClose();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-lg font-semibold">Add New Skill</h2>

      <div>
        <label>Title</label>
        <input {...register("title", { required: true })} className="w-full p-2 rounded bg-gray-800 border border-gray-600" />
        {errors.title && <p className="text-red-400 text-sm">Title is required</p>}
      </div>

      <div>
        <label>Version</label>
        <input {...register("version", { required: true })} className="w-full p-2 rounded bg-gray-800 border border-gray-600" />
        {errors.version && <p className="text-red-400 text-sm">Version is required</p>}
      </div>

      <div>
        <label>Icon URL</label>
        <input {...register("icon", { required: true })} className="w-full p-2 rounded bg-gray-800 border border-gray-600" />
        {errors.icon && <p className="text-red-400 text-sm">Icon URL is required</p>}
      </div>

      <div>
        <label>Color</label>
        <input {...register("color", { required: true })} className="w-full p-2 rounded bg-gray-800 border border-gray-600" />
        {errors.color && <p className="text-red-400 text-sm">Color is required</p>}
      </div>

      <div>
        <label>Background Hover</label>
        <input {...register("bgHover", { required: true })} className="w-full p-2 rounded bg-gray-800 border border-gray-600" />
        {errors.bgHover && <p className="text-red-400 text-sm">Background Hover is required</p>}
      </div>

      <button type="submit" disabled={isSubmitting} className="bg-blue-600 px-4 py-2 rounded text-white">
        {isSubmitting ? "Adding..." : "Add Skill"}
      </button>
    </form>
  );
}
