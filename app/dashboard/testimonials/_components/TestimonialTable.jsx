"use client";
import toast from "react-hot-toast";
import TestimonialEditModal from "./TestimonialEditModal";
import { useState } from "react";

export default function TestimonialTable({ testimonialsData, permission }) {

  const [testimonials, setTestimonials] = useState(testimonialsData);
  const [selected, setSelected] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statusLoading, setStatusLoading] = useState(null);


  const openModal = (testimonial) => {
    setSelected(testimonial);
    setModalOpen(true);
  };

  // Update testimonial
  const handleUpdate = async (data) => {
    try {
      setLoading(true);
      const res = await fetch("/api/testimonial/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selected.id, ...data }),
      });
      const result = await res.json();
      if (res.ok && result.success) {
        toast.success("Testimonial updated successfully!");
        setTestimonials((prev) =>
          prev.map((t) => (t.id === selected.id ? { ...t, ...data } : t))
        );
        setModalOpen(false);
      } else {
        toast.error(result.error || "Failed to update");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // Toggle status
  const toggleStatus = async (testimonial) => {
    try {
      setStatusLoading(testimonial.id);
      const newStatus = testimonial.status === "approved" ? "pending" : "approved";
      const res = await fetch("/api/testimonial/updateStatus", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: testimonial.id, status: newStatus }),
      });
      const result = await res.json();
      if (res.ok && result.success) {
        toast.success(`Status updated to ${newStatus}`);
        setTestimonials((prev) =>
          prev.map((t) => (t.id === testimonial.id ? { ...t, status: newStatus } : t))
        );
      } else {
        toast.error(result.error || "Failed to update status");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    } finally {
      setStatusLoading(null);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Testimonials</h1>

      {/* Table for large screens */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full bg-gray-800 text-white rounded-lg overflow-hidden">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Designation</th>
              <th className="px-4 py-2 text-left">Company</th>
              <th className="px-4 py-2 text-center">Status</th>
              <th className="px-4 py-2 text-center">Created</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {testimonials.map((t) => (
              <tr key={t.id} className="border-b border-gray-700">
                <td className="px-4 py-2">{t.name}</td>
                <td className="px-4 py-2">{t.role}</td>
                <td className="px-4 py-2">{t.company}</td>
                <td className="px-4 py-2 text-center">
                  <button
                    disabled={statusLoading === t.id}
                    onClick={() => toggleStatus(t)}
                    className={`px-2 py-1 rounded-lg ${
                      t.status === "approved" ? "bg-green-500" : "bg-yellow-500"
                    }`}
                  >
                    {statusLoading === t.id ? "Loading..." : t.status}
                  </button>
                </td>
                <td className="px-4 py-2 text-center">{new Date(t.createdAt).toLocaleString()}</td>
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => openModal(t)}
                    className="px-3 py-1 bg-cyan-500 hover:bg-cyan-600 rounded-lg"
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card layout for mobile */}
      <div className="md:hidden space-y-4">
        {testimonials.map((t) => (
          <div key={t.id} className="bg-gray-800 text-white rounded-lg p-4 shadow-md space-y-2">
            <div className="flex items-center gap-4">
              <img src={t.avatar} alt={t.name} className="w-16 h-16 rounded-full border border-gray-700" />
              <div>
                <h2 className="font-bold text-lg">{t.name}</h2>
                <p className="text-gray-400">{t.role}</p>
                <p className="text-gray-400">{t.company}</p>
              </div>
            </div>
            <div className="flex justify-between items-center mt-2">
              <button
                disabled={statusLoading === t.id}
                onClick={() => toggleStatus(t)}
                className={`px-3 py-1 rounded-lg text-sm ${
                  t.status === "approved" ? "bg-green-500" : "bg-yellow-500"
                }`}
              >
                {statusLoading === t.id ? "Loading..." : t.status}
              </button>
              <span className="text-gray-400 text-sm ml-2">{new Date(t.createdAt).toLocaleString()}</span>
              <button
                onClick={() => openModal(t)}
                className="px-3 py-1 bg-cyan-500 hover:bg-cyan-600 rounded-lg text-sm"
              >
                Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <TestimonialEditModal
        testimonial={selected}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onUpdate={handleUpdate}
        loading={loading}
      />
    </div>
  );
}
