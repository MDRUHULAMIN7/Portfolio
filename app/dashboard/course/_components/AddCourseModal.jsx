"use client";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

export default function AddCourseModal({ onClose, onSuccess }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data, "form data");
    try {
      const res = await fetch("/api/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data }),
      });

      if (!res.ok) {
        let errorMessage = "Failed to add course";
        try {
          const errorResult = await res.json();
          errorMessage = errorResult.error || errorMessage;
        } catch (parseError) {
          console.error("Error parsing response:", parseError);
        }
        throw new Error(errorMessage);
      }

      const result = await res.json();

      toast.success("Course added successfully!");
      reset();
      onSuccess && onSuccess(result);
      onClose();
    } catch (err) {
      console.error("Error adding course:", err);
      toast.error(err.message || "An unexpected error occurred");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-lg font-semibold">Add New Course</h2>

      <div>
        <label className="label">Title</label>
        <input
          placeholder="Course Title"
          {...register("title", { required: true })}
          className="input-field"
        />
        {errors.title && (
          <p className="text-red-400 text-sm">Title is required</p>
        )}
      </div>

      <div>
        <label className="label">From</label>
        <input
          placeholder="Course Where from"
          {...register("from", { required: true })}
          className="input-field"
        />
        {errors.from && (
          <p className="text-red-400 text-sm">From is required</p>
        )}
      </div>

      <div>
        <label className="label">Time</label>
        <input
          placeholder="Course Duration"
          {...register("time", { required: true })}
          className="input-field"
        />
        {errors.time && (
          <p className="text-red-400 text-sm">Time is required</p>
        )}
      </div>

      <div>
        <label className="label">Credentials</label>
        <input
          type="url"
          placeholder="Course Certificate"
          {...register("credentials", { required: true })}
          className="input-field"
        />
        {errors.credentials && (
          <p className="text-red-400 text-sm">Credentials is required</p>
        )}
      </div>

      <div>
        <label className="label">Description</label>
        <textarea
          placeholder="Course Description"
          {...register("description", { required: true })}
          className="input-field"
        />
        {errors.description && (
          <p className="text-red-400 text-sm">Description is required</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-cyan-600 px-4 py-2 rounded text-gray-900"
      >
        {isSubmitting ? "Adding..." : "Add Course"}
      </button>
    </form>
  );
}
