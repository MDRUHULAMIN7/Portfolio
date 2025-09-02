"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";
import { useForm } from "react-hook-form";


export default function TestimonialEditModal({ testimonial, isOpen, onClose, onUpdate, loading }) {
  const { register, handleSubmit, reset } = useForm();

  // Reset form whenever testimonial changes
  useEffect(() => {
    if (testimonial) reset(testimonial);
  }, [testimonial, reset]);

  const submitHandler = (data) => {
    onUpdate(data);
  };

  return (
    <AnimatePresence>
      {isOpen && testimonial && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-gray-900 rounded-2xl w-full max-w-lg md:max-w-3xl p-6 text-white overflow-y-auto max-h-[90vh]"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
          >
            <h2 className="text-xl font-bold mb-4">Edit Testimonial</h2>
            <form onSubmit={handleSubmit(submitHandler)} className="space-y-3">
              <div className="flex flex-col md:flex-row items-center gap-4">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  width={300}
                  height={300}

                  className="w-16 h-16 rounded-full border border-gray-700"
                />
                <input
                  type="url"
                  {...register("avatar")}
                  placeholder="Avatar URL"
                  className="flex-1 w-full px-3 py-2 rounded bg-gray-800 border border-gray-700"
                />
              </div>
              <input {...register("name")} placeholder="Name" className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700" />
              <input {...register("role")} placeholder="Designation" className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700" />
              <input {...register("company")} placeholder="Company" className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700" />
              <input {...register("rating")} placeholder="Rating" className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700" />
              <input type="email" {...register("email")} placeholder="Email" className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700" />
              <textarea {...register("review")} placeholder="Review" className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700" rows={5} />

              <div className="flex flex-col md:flex-row gap-y-2 items-start justify-between md:items-center text-sm text-gray-400">
                <span>Status: {testimonial.status}</span>
                <span>Created: {new Date(testimonial.createdAt).toLocaleString()}</span>
                <span>Updated: {new Date(testimonial.updatedAt).toLocaleString()}</span>
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg">
                  {loading ? "Saving..." : "Update"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
