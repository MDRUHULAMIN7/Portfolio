"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import AddExperienceModal from "./AddExperienceModal";
import EditExperienceModal from "./EditExperienceModal";

import { Edit, Trash2 } from "lucide-react";
import DeleteConfirmModal from "./DeleteConfirmModal";

export default function ExperienceTable({ experiencesdata }) {
  const [experiences, setExperiences] = useState(experiencesdata);
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editingExp, setEditingExp] = useState(null);

  const [deleteModal, setDeleteModal] = useState({ open: false, experience: null });

  const handleDeleteClick = (experience) => {
    setDeleteModal({ open: true, experience });
  };

  const handleDelete = async (deletedExp) => {
    setExperiences((prev) => prev.filter((e) => e.id !== deletedExp.id));
  };

  const handleAdd = async (data) => {
    try {
      data.images = data.images.map((img) => img.url);
      const res = await fetch("/api/experience", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to add experience");
      toast.success("Experience added!");
      setAddOpen(false);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="md:p-6 p-3">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setAddOpen(true)}
          className="px-4 py-2 border-cyan-400 border text-white rounded-lg bg-cyan-500"
        >
          + Add Experience
        </button>
      </div>

      {/* Table for big screens */}
      <div className="hidden xl:block overflow-x-auto rounded-lg border border-gray-700 shadow-lg">
        <table className="min-w-full text-sm bg-gray-900">
          <thead className="text-white">
            <tr>
              <th className="p-3 text-left">Designation</th>
              <th className="p-3 text-left">Company</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Duration</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {experiences.map((exp) => (
              <tr key={exp.id} className="border-t border-gray-700">
                <td className="p-3 text-white">{exp.designation}</td>
                <td className="p-3 text-white">{exp.company}</td>
                <td className="p-3 text-white">{exp.type}</td>
                <td
                  className={`p-3 font-semibold ${
                    exp.status === "Ongoing"
                      ? "text-green-600"
                      : exp.status === "Completed"
                      ? "text-blue-600"
                      : "text-red-600"
                  }`}
                >
                  {exp.status}
                </td>
                <td className="p-3">
                  {new Date(exp.startDate).toLocaleDateString()} -{" "}
                  {exp.endDate
                    ? new Date(exp.endDate).toLocaleDateString()
                    : "Present"}
                </td>
                <td className="p-3 flex gap-4">
                  <button
                    onClick={() => {
                      setEditingExp(exp);
                      setEditOpen(true);
                    }}
                    className=" flex justify-center items-center gap-1 text-cyan-400 hover:text-cyan-300"
                  >
                    <Edit size={20} />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(exp)}
                    className="text-red-400 hover:text-red-300 transition-colors duration-200"
                    title="Delete Experience"
                  >
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards for smaller screens */}
      <div className="xl:hidden grid gap-4">
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="bg-gray-800 p-4 rounded-lg shadow text-white"
          >
            <div className="flex justify-between items-start mb-2">
              <h2 className="font-bold text-lg">{exp.designation}</h2>
              <span
                className={`font-semibold ${
                  exp.status === "Ongoing"
                    ? "text-green-500"
                    : exp.status === "Completed"
                    ? "text-blue-500"
                    : "text-red-500"
                }`}
              >
                {exp.status}
              </span>
            </div>
            <p className="text-sm mb-1">
              <strong>Company:</strong> {exp.company}
            </p>
            <p className="text-sm mb-1">
              <strong>Type:</strong> {exp.type}
            </p>
            <p className="text-sm mb-1">
              <strong>Duration:</strong>{" "}
              {new Date(exp.startDate).toLocaleDateString()} -{" "}
              {exp.endDate
                ? new Date(exp.endDate).toLocaleDateString()
                : "Present"}
            </p>
            <div className="flex justify-end mt-2 gap-2">
              <button
                onClick={() => {
                  setEditingExp(exp);
                  setEditOpen(true);
                }}
                className=" flex justify-center items-center gap-1 text-cyan-400 hover:text-cyan-300"
              >
                <Edit size={20} /> 
              </button>
              <button
                onClick={() => handleDeleteClick(exp)}
                className="text-red-400 hover:text-red-300 transition-colors duration-200"
                title="Delete Experience"
              >
                <Trash2  size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      <AddExperienceModal
        isOpen={addOpen}
        onClose={() => setAddOpen(false)}
        onSubmit={handleAdd}
      />

      {/* Edit Modal */}
      <EditExperienceModal
        isOpen={editOpen}
        setEditOpen={setEditOpen}
        onClose={() => {
          setEditOpen(false);
          setEditingExp(null);
        }}
        experience={editingExp}
      />

      {/* Delete Modal */}
      <DeleteConfirmModal
        isOpen={deleteModal.open}
        project={deleteModal.experience}
        onClose={() => setDeleteModal({ open: false, experience: null })}
        onDelete={handleDelete}
      />
    </div>
  );
}
