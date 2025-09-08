
"use client";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

export default function EditSocialModal({ social, onClose, onSuccess }) {
   
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: social });

  const onSubmit = async (data) => {
    try {
      const res = await fetch(`/api/socials/${social.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to update socials");

      const updated = await res.json();
      toast.success("Social links updated successfully!");
      onSuccess && onSuccess(updated);
      onClose();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-lg font-semibold">Edit Social Links</h2>

      <div>
        <label className="label">LinkedIn</label>
        <input
          {...register("linkedin", { required: true })}
          className="input-field"
        />
        {errors.linkedin && (
          <p className="text-red-400 text-sm">LinkedIn is required</p>
        )}
      </div>

      <div>
        <label className="label">GitHub</label>
        <input
          {...register("github", { required: true })}
          className="input-field"
        />
        {errors.github && (
          <p className="text-red-400 text-sm">GitHub is required</p>
        )}
      </div>

      <div>
        <label className="label">Facebook</label>
        <input
          {...register("facebook", { required: true })}
          className="input-field"
        />
        {errors.facebook && (
          <p className="text-red-400 text-sm">Facebook is required</p>
        )}
      </div>

      <div>
        <label className="label">Resume</label>
        <input
          {...register("resume", { required: true })}
          className="input-field"
        />
        {errors.resume && (
          <p className="text-red-400 text-sm">Resume is required</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-cyan-600 px-4 py-2 rounded text-white"
      >
        {isSubmitting ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}
