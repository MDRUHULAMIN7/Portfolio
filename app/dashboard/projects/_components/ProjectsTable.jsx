"use client";

import { useState, useEffect } from "react";
import { Edit, Trash2, ExternalLink, Eye } from "lucide-react";
import Link from "next/link";
import StatusToggle from "./StatusToggle";
import DeleteConfirmModal from "./DeleteConfirmModal";

export default function ProjectsTable({ projects: initialProjects }) {
  const [projects, setProjects] = useState(initialProjects); // <-- manage state here
  const [deleteModal, setDeleteModal] = useState({ open: false, project: null });

  const handleDeleteClick = (project) => {
    setDeleteModal({ open: true, project });
  };

  const handleDelete = (deletedProject) => {
    // Remove project from state immediately
    setProjects((prev) => prev.filter((p) => p.id !== deletedProject.id));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

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
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-gray-800 transition-colors duration-200">
                  <td className="px-6 py-4">
                    <div>
                      <h3 className="text-sm font-medium text-white truncate max-w-xs">
                        {project.title}
                      </h3>
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
                      <Link 
                        href={`/projects/${project.id}`}
                        className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
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
        <div className="xl:hidden">
          {projects.map((project) => (
            <div key={project.id} className="p-6 border-b border-gray-700 last:border-b-0">
              {/* ...same mobile layout... */}
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
        onDelete={handleDelete} // <-- update state here
      />
    </>
  );
}
