"use client";
import { useState } from "react";
import { Plus, Eye, Pencil, Trash2 } from "lucide-react";

import ModalWrapper from "@/components/ModalWrapper";
import AddSkillModal from "./AddSkillModal";
import EditSkillModal from "./EditSkillModal";
import DetailsSkillModal from "./DetailsSkillModal";
import DeleteSkillModal from "./DeleteSkillModal";

export default function SkillsTable({ skills: initialSkills }) {
  const [skills, setSkills] = useState(initialSkills); // <-- manage local state
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [modalType, setModalType] = useState(null);

  const openModal = (type, skill = null) => {
    setSelectedSkill(skill);
    setModalType(type);
  };

  const closeModal = () => {
    setSelectedSkill(null);
    setModalType(null);
  };

  const handleAddSuccess = (newSkill) => {
    setSkills((prev) => [...prev, newSkill]);
  };

const handleEditSuccess = (updatedSkill) => {
  setSkills((prev) =>
    prev.map((s) => (s.id === updatedSkill.id ? updatedSkill : s))
  );
};



  const handleDeleteSuccess = (deletedId) => {
    setSkills((prev) => prev.filter((s) => s.id !== deletedId));
  };

  return (
    <div>
    
      <div className=" mb-4 flex justify-end items-center">
        <button
          onClick={() => openModal("add")}
          className="bg-cyan-400 text-gray-900 px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Skill
        </button>
      </div>


      <div className="overflow-x-auto hidden md:block">
        <table className="min-w-full border border-gray-700 text-left">
          <thead className="bg-gray-800">
            <tr>
              <th className="p-2">Icon</th>
              <th className="p-2">Title</th>
              <th className="p-2">Updated</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {skills.map((skill) => (
              <tr key={skill._id} className="border-b border-gray-700">
                <td className="p-2">
                  <img src={skill.icon} alt={skill.title} className="w-8 h-8" />
                </td>
                <td className="p-2">{skill.title}</td>
                <td className="p-2">
                  {new Date(skill.updatedDate).toLocaleDateString()}
                </td>
                <td className="p-2 flex gap-2 gap-x-4">
                  <button onClick={() => openModal("details", skill)}>
                    <Eye className="w-4 h-4 text-blue-400" />
                  </button>
                  <button onClick={() => openModal("edit", skill)}>
                    <Pencil className="w-4 h-4 text-green-400" />
                  </button>
                  <button onClick={() => openModal("delete", skill)}>
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {skills.map((skill) => (
          <div key={skill._id} className="p-4 border border-gray-700 rounded-lg flex justify-between">
            <div>
              <img src={skill.icon} alt={skill.title} className="w-10 h-10 mb-2" />
              <p>{skill.title}</p>
              <p className="text-xs text-gray-400">{new Date(skill.updatedDate).toLocaleDateString()}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => openModal("details", skill)}><Eye className="w-4 h-4 text-blue-400" /></button>
              <button onClick={() => openModal("edit", skill)}><Pencil className="w-4 h-4 text-green-400" /></button>
              <button onClick={() => openModal("delete", skill)}><Trash2 className="w-4 h-4 text-red-400" /></button>
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}
      <ModalWrapper isOpen={modalType === "add"} onClose={closeModal}>
        <AddSkillModal onClose={closeModal} onSuccess={handleAddSuccess} />
      </ModalWrapper>
      <ModalWrapper isOpen={modalType === "edit"} onClose={closeModal}>
        <EditSkillModal skill={selectedSkill} onClose={closeModal} onSuccess={handleEditSuccess} />
      </ModalWrapper>
      <ModalWrapper isOpen={modalType === "details"} onClose={closeModal}>
        <DetailsSkillModal skill={selectedSkill} />
      </ModalWrapper>
      <ModalWrapper isOpen={modalType === "delete"} onClose={closeModal}>
        <DeleteSkillModal skill={selectedSkill} onClose={closeModal} onSuccess={handleDeleteSuccess} />
      </ModalWrapper>
    </div>
  );
}
