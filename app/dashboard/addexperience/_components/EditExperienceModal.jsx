"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { useEffect } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { X } from "lucide-react";

export default function EditExperienceModal({ isOpen, onClose, experience ,setEditOpen }) {
  const { register, handleSubmit, control, reset, setValue } = useForm({
    defaultValues: { images: [] },
  });
  const { fields, append, remove } = useFieldArray({ control, name: "images" });

useEffect(() => {
  if (experience) {
    setValue("designation", experience.designation);
    setValue("type", experience.type);
    setValue("company", experience.company);
    setValue("logo", experience.logo);
    setValue("opinion", experience.opinion);

    // Fix for date inputs
    const formatDate = (date) => date ? new Date(date).toISOString().split("T")[0] : "";
    setValue("startDate", formatDate(experience.startDate));
    setValue("endDate", formatDate(experience.endDate));

    setValue("status", experience.status);
    setValue("images", experience.images?.map(url => ({ url })) || []);
  }
}, [experience, setValue]);

 // Edit experience
  const handleEdit = async (data) => {
    try {
      data.images = data.images.map((img) => img.url);
      const res = await fetch(`/api/experience/${experience.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to update experience");
      toast.success("Experience updated!");
      setEditOpen(false);
      
      onClose();

    } catch (err) {
      toast.error(err.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto noscrollbar">
        <h2 className="text-xl font-bold mb-4">Edit Experience</h2>

        <form onSubmit={handleSubmit(handleEdit)} className="space-y-4">
          <input {...register("designation", { required: true })} placeholder="Designation" className="input-field" />
          <input {...register("type", { required: true })} placeholder="Type (Company/Event)" className="input-field" />
          <input {...register("company", { required: true })} placeholder="Company / Event Name" className="input-field" />
          <Image src={experience.logo} alt={experience.company} width={100} height={100} className="w-18  p-2 border rounded-full" />

          <input {...register("logo", { required: true })} placeholder="Logo URL" className="input-field" />
          <textarea {...register("opinion", { required: true })} placeholder="Opinion" className="input-field" />

          <div className="grid grid-cols-2 gap-4">
            <input type="date" {...register("startDate", { required: true })} className="input-field" />
            <input type="date" {...register("endDate")} className="input-field" />
          </div>

          <select {...register("status", { required: true })} className="input-field">
            <option value="">Select Status</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Completed">Completed</option>
            <option value="Resigned">Resigned</option>
          </select>

          {/* Dynamic Images */}
          <div className="space-y-2">
            <label className="font-medium text-gray-200">Images</label>
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-2 items-center">
                <input
                  {...register(`images.${index}.url`, { required: true })}
                  placeholder="Image URL"
                  className="input-field"
                  defaultValue={field.url}
                />
                         <button type="button" onClick={() => remove(index)} className="p-1.5 rounded-xl  bg-cyan-400"><X size={18} /></button>
              </div>
            ))}
            <button type="button" onClick={() => append({ url: "" })} className="px-3 py-1 bg-cyan-500 text-white rounded hover:bg-cyan-600">+ Add Image</button>

            <div className="flex flex-wrap gap-2 mt-2">
              {fields.map((field, idx) => field.url && <img key={idx} src={field.url} className="w-20 h-20 object-cover rounded border" />)}
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-100  text-gray-700 rounded hover:bg-gray-300">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-cyan-400 text-white rounded hover:bg-cyan-500">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}
