"use client";
import { useState } from "react";
import ModalWrapper from "@/components/ModalWrapper";
import AddCourseModal from "./AddCourseModal";
import EditCourseModal from "./EditCourseModal";
import DeleteCourseModal from "./DeleteCourseModal";
import { Edit3, Trash2, Plus } from "lucide-react";
import Image from "next/image";

export default function CourseTable({ courses: initialCourses }) {
  const [courses, setCourses] = useState(initialCourses);
  const [addModal, setAddModal] = useState(false);
  const [editCourse, setEditCourse] = useState(null);
  const [deleteCourse, setDeleteCourse] = useState(null);

  const handleAddSuccess = (newCourse) => {
    setCourses((prev) => [...prev, newCourse]);
  };

  const handleEditSuccess = (updatedCourse) => {
    setCourses((prev) =>
      prev.map((c) => (c._id === updatedCourse._id ? updatedCourse : c))
    );
  };

  const handleDeleteSuccess = (id) => {
    setCourses((prev) => prev.filter((c) => c._id !== id));
  };

  return (
    <div>
    <div className="flex items-center justify-end">    <button
        onClick={() => setAddModal(true)}
        className="flex items-center justify-end font-medium gap-2 bg-cyan-600 px-4 py-2 rounded text-gray-900 mb-4"
      >
        <Plus className="w-5 h-5 " />
        Add Course
      </button></div>
  

      {/* Desktop Table */}
      <div className="hidden md:block">
        <table className="w-full text-left border border-gray-700">
          <thead>
            <tr className="border-b border-gray-600 ">
              <th className="p-2">Title</th>
              <th className="p-2">From</th>
              <th className="p-2">Time</th>
             
            
              <th className="text-center p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id} className="border-b border-gray-700 p-2">
                <td className="p-2">{course.title}</td>
                <td className="p-2">{course.from}</td>
                <td className="p-2">{course.time}</td>
               
              
                <td className="flex gap-2 justify-center py-2">
                  <button
                    onClick={() => setEditCourse(course)}
                    className="p-2 bg-cyan-500 text-gray-900 rounded hover:bg-cyan-600"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeleteCourse(course)}
                    className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="space-y-4 md:hidden ">
        {courses.map((course) => (
          <div
            key={course._id}
            className="border border-gray-700 rounded-lg p-4 shadow-sm"
          >
            <h3 className="text-lg font-semibold">{course.title}</h3>
            <p className="text-sm text-gray-300">From: {course.from}</p>
            <p className="text-sm text-gray-300">Time: {course.time}</p>
            <label className="label">Credential:</label>
            <Image src={course.credentials} alt={course.title} width={300} height={200} />
           
       

            <div className="flex gap-3 mt-3">
              <button
                onClick={() => setEditCourse(course)}
                className="flex items-center gap-1 px-3 py-1 bg-cyan-500 text-white rounded hover:bg-cyan-600 text-sm"
              >
                <Edit3 className="w-4 h-4" /> Edit
              </button>
              <button
                onClick={() => setDeleteCourse(course)}
                className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
              >
                <Trash2 className="w-4 h-4" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      <ModalWrapper isOpen={addModal} onClose={() => setAddModal(false)}>
        <AddCourseModal
          onClose={() => setAddModal(false)}
          onSuccess={handleAddSuccess}
        />
      </ModalWrapper>

      {/* Edit Modal */}
      <ModalWrapper isOpen={!!editCourse} onClose={() => setEditCourse(null)}>
        {editCourse && (
          <EditCourseModal
            course={editCourse}
            onClose={() => setEditCourse(null)}
            onSuccess={handleEditSuccess}
          />
        )}
      </ModalWrapper>

      {/* Delete Modal */}
      <ModalWrapper isOpen={!!deleteCourse} onClose={() => setDeleteCourse(null)}>
        {deleteCourse && (
          <DeleteCourseModal
            course={deleteCourse}
            onClose={() => setDeleteCourse(null)}
            onSuccess={handleDeleteSuccess}
          />
        )}
      </ModalWrapper>
    </div>
  );
}
