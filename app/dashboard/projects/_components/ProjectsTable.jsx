"use client";

import { useState } from "react";
import { Edit, Trash2, ExternalLink, TriangleAlert, ArrowUp, ArrowDown } from "lucide-react";
import Link from "next/link";
import StatusToggle from "./StatusToggle";
import DeleteConfirmModal from "./DeleteConfirmModal";
import ModalButton from "./ModalButton";


const normalizeProjects = (data) =>
  data.map((p) => ({
    ...p,
    id: p._id?.toString() ?? p.id,
    _id: undefined, 
  }));


export default function ProjectsTable({ projects: initialProjects }) {
const [projects, setProjects] = useState(
  normalizeProjects(initialProjects).map((p, i) => ({
    ...p,
    order: typeof p.order === "number" ? p.order : i + 1,
  })).sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
);
 

  const [deleteModal, setDeleteModal] = useState({ open: false, project: null });

  const handleDeleteClick = (project) => {
    setDeleteModal({ open: true, project });
  };

  const handleDelete = (deletedProject) => {
 
    setProjects((prev) => prev.filter((p) => p.id !== deletedProject.id));
  };

  const persistOrder = async (list) => {
    const items = list.map((p, idx) => ({ id: p.id, order: idx + 1 }));
    try {
      await fetch("/api/projects/reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
    } catch (e) {}
  };

  const move = (id, dir) => {
    setProjects((prev) => {
      const idx = prev.findIndex((p) => p.id === id);
      if (idx < 0) return prev;
      const target = dir === "up" ? idx - 1 : idx + 1;
      if (target < 0 || target >= prev.length) return prev;
      const copy = [...prev];
      const tmp = copy[idx];
      copy[idx] = copy[target];
      copy[target] = tmp;
      const withOrder = copy.map((p, i) => ({ ...p, order: i + 1 }));
      persistOrder(withOrder);
      return withOrder;
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if(!projects){
    return <h1 className="text-2xl font-bold text-white flex justify-center items-center gap-x-2"> <TriangleAlert /> No Projects Found</h1>

  }

  return (
    <>
      <div className="rounded-xl shadow-2xl overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden xl:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800 border-b border-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Project
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Order
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {projects?.map((project, index) => (
                <tr key={project.id} className="hover:bg-gray-800 transition-colors duration-200">
                  <td className="px-6 py-4">
                    <div>
                      <h3 className="text-sm font-medium text-white truncate max-w-xs">
                        {project.title}
                      </h3>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-gray-700 text-gray-200 text-xs">{index + 1}</span>
                      <button
                        onClick={() => move(project.id, "up")}
                        className="p-1 rounded bg-gray-700 hover:bg-gray-600 text-gray-200 disabled:opacity-40"
                        disabled={index === 0}
                        title="Move Up"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => move(project.id, "down")}
                        className="p-1 rounded bg-gray-700 hover:bg-gray-600 text-gray-200 disabled:opacity-40"
                        disabled={index === projects.length - 1}
                        title="Move Down"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-cyan-900 text-cyan-400">
                      {project.meta.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <StatusToggle
                      projectId={project.id}
                      currentStatus={project?.status}
                    />
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {formatDate(project.createdAt)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <ModalButton project={project} />

                      <Link 
                        href={`/dashboard/projects/edit/${project.id}`}
                        className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                        title="Edit Project"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                      {project.links?.[0]?.live && (
                        <a 
                          href={project.links[0].live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-400 hover:text-green-300 transition-colors duration-200"
                          title="Visit Live Site"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                      <button
                        onClick={() => handleDeleteClick(project)}
                        className="text-red-400 hover:text-red-300 transition-colors duration-200"
                        title="Delete Project"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
         <div className="block xl:hidden">
          {projects.map((project, index) => (
            <div key={project.id} className="p-6 border-b border-gray-700 last:border-b-0">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-medium text-white truncate flex-1 mr-4">
                  {project.title}
                </h3>
                <StatusToggle 
                  projectId={project.id}
                  currentStatus={project.status}
                />
              </div>
              
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-0.5 rounded bg-gray-700 text-gray-200 text-xs">{index + 1}</span>
                <button
                  onClick={() => move(project.id, "up")}
                  className="p-1 rounded bg-gray-700 hover:bg-gray-600 text-gray-200 disabled:opacity-40"
                  disabled={index === 0}
                  title="Move Up"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
                <button
                  onClick={() => move(project.id, "down")}
                  className="p-1 rounded bg-gray-700 hover:bg-gray-600 text-gray-200 disabled:opacity-40"
                  disabled={index === projects.length - 1}
                  title="Move Down"
                >
                  <ArrowDown className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex justify-between items-center mb-4 ">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-cyan-900 text-cyan-400">
                  {project.meta.type}
                </span>
                <span className="text-xs text-gray-400">
                  {formatDate(project.createdAt)}
                </span>
              </div>
              
              <div className="flex items-center justify-start gap-x-2 sm:gap-x-5">

                <div className="flex items-center gap-x-2 sm:gap-x-5">

                   <ModalButton project={project} />
                  <Link 
                    href={`/dashboard/projects/edit/${project?.id}`}
                    className="flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-200 text-sm"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Link>
                </div>
                
                <div className="flex items-center gap-x-2 sm:gap-x-5">
                  {project?.links?.[0]?.live && (
                    <a 
                      href={project?.links[0]?.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-green-400 hover:text-green-300 transition-colors duration-200 text-sm"
                    >
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Live
                    </a>
                  )}
                  <button
                    onClick={() => handleDeleteClick(project)}
                    className="flex items-center text-red-400 hover:text-red-300 transition-colors duration-200 text-sm"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {projects.length === 0 && (
          <div className="p-12 text-center">
            <div className="text-gray-400 text-lg">No projects found</div>
            <p className="text-gray-500 text-sm mt-2">Start by creating your first project</p>
          </div>
        )}
      </div>

      {/* Delete Modal */}
      <DeleteConfirmModal
        isOpen={deleteModal.open}
        project={deleteModal.project}
        onClose={() => setDeleteModal({ open: false, project: null })}
        onDelete={handleDelete} 
      />
    </>
  );
}
