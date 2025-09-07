"use client"
import { useState } from "react"
import { Trash2 } from "lucide-react"
import DeleteConfirmModal from "./DeleteConfirmModal"

export default function VisitorsTable({ visitorsData }) {
  const [visitors, setVisitors] = useState(visitorsData)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedVisitor, setSelectedVisitor] = useState(null)

  // New state for user agent modal
  const [showUserAgentModal, setShowUserAgentModal] = useState(false)
  const [selectedUserAgent, setSelectedUserAgent] = useState("")

  const handleDeleteClick = (visitor) => {
    setSelectedVisitor(visitor)
    setShowDeleteModal(true)
  }

  const handleDeleteVisitor = async (visitorId) => {
    try {
      const response = await fetch(`/api/visitors/${visitorId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setVisitors((prev) => prev.filter((v) => v.id !== visitorId))
        console.log("Visitor deleted successfully")
      } else {
        console.error("Failed to delete visitor")
      }
    } catch (error) {
      console.error("Error deleting visitor:", error)
    }
  }

  const handleConfirmDelete = () => {
    if (selectedVisitor) {
      handleDeleteVisitor(selectedVisitor.id)
    }
    setShowDeleteModal(false)
    setSelectedVisitor(null)
  }

  const handleCancelDelete = () => {
    setShowDeleteModal(false)
    setSelectedVisitor(null)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const truncateUserAgent = (userAgent, maxLength = 50) => {
    if (!userAgent) return "Unknown"
    return userAgent.length <= maxLength
      ? userAgent
      : userAgent.substring(0, maxLength) + "..."
  }

  // New handlers for User Agent modal
  const handleUserAgentHover = (userAgent) => {
    setSelectedUserAgent(userAgent)
    setShowUserAgentModal(true)
  }

  const handleUserAgentClose = () => {
    setShowUserAgentModal(false)
    setSelectedUserAgent("")
  }

  return (
    <>
      <div className="overflow-hidden bg-gray-800 shadow-xl rounded-2xl border border-gray-700">
        {/* Desktop Table */}
        <div className="hidden md:block">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  IP Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  User Agent
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Visited At
                </th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {visitors.map((visitor) => (
                <tr
                  key={visitor.id}
                  className="hover:bg-gray-700/50 transition-all duration-200"
                >
                  <td className="px-6 py-4 text-sm text-gray-100 font-mono">
                    {visitor.ip}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400 max-w-xs">
                    <span
                      onClick={() => handleUserAgentHover(visitor.userAgent)}
                      className="cursor-pointer "
                    >
                      {truncateUserAgent(visitor.userAgent)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-200">
                    {formatDate(visitor.visitedAt)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleDeleteClick(visitor)}
                      className="text-red-400 hover:text-red-300 bg-red-400/10 hover:bg-red-500/20 transition-all duration-200 p-2 rounded-lg"
                      title="Delete visitor"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden">
          {visitors.map((visitor) => (
            <div
              key={visitor.id}
              className="bg-gray-900 rounded-xl shadow-md border border-gray-700 p-4 mb-3 transition hover:shadow-lg"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="text-sm font-semibold text-gray-100">
                    {visitor.ip}
                  </div>
                  <div className="text-xs text-gray-400">
                    {formatDate(visitor.visitedAt)}
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteClick(visitor)}
                  className="text-red-400 hover:text-red-300 bg-red-400/10 hover:bg-red-500/20 p-2 rounded-lg transition"
                  title="Delete visitor"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              <div
                onClick={() => handleUserAgentHover(visitor.userAgent)}
                className="text-xs text-gray-400 mt-2 break-words cursor-pointer "
              >
                <span className="font-semibold text-gray-300">User Agent:</span>{" "}
                {truncateUserAgent(visitor.userAgent, 80)}
              </div>
            </div>
          ))}
        </div>

        {visitors.length === 0 && (
          <div className="text-center py-10 text-gray-400 text-sm">
            No visitors found
          </div>
        )}
      </div>

      {/* Delete Modal */}
      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        visitorInfo={selectedVisitor}
      />

      {/* User Agent Modal */}
      {showUserAgentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-gray-700 rounded-xl shadow-xl max-w-lg w-10/12 p-6">
            <h3 className="text-lg font-semibold text-gray-100 mb-4">
              User Agent
            </h3>
            <p className="text-sm text-gray-300 break-words">
              {selectedUserAgent}
            </p>
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleUserAgentClose}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
