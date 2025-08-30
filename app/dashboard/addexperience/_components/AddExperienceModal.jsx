"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { useEffect } from "react";
import { X } from "lucide-react";

export default function AddExperienceModal({ isOpen, onClose, onSubmit }) {
  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: { images: [] },
  });
  const { fields, append, remove } = useFieldArray({ control, name: "images" });

  useEffect(() => {
    if (!isOpen) reset({ images: [] });
  }, [isOpen, reset]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Add Experience</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input {...register("designation", { required: true })} placeholder="Designation" className="input-field" />
          <input {...register("type", { required: true })} placeholder="Type (Company/Event)" className="input-field" />
          <input {...register("company", { required: true })} placeholder="Company / Event Name" className="input-field" />
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
            <label className="font-medium text-gray-200 mr-4">Images</label>
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-2  items-center">
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
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-300">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-cyan-400 text-white rounded hover:bg-cyan-600">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}
