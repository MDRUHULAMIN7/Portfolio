"use client"
import { X } from 'lucide-react'

export default function DeleteConfirmModal({ isOpen, onConfirm, onCancel, visitorInfo }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/80 bg-opacity-70 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-700 rounded-lg shadow-xl max-w-md w-full">
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-100">
            Confirm Delete
          </h3>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6">
          <p className="text-gray-100 mb-4">
            Are you sure you want to delete this visitor record?
          </p>
          
          {visitorInfo && (
            <div className="text-gray-100 rounded-md p-3 mb-4">
              <div className="text-sm">
                <div className="mb-1">
                  <strong>IP:</strong> {visitorInfo.ip}
                </div>
                <div className="mb-1">
                  <strong>Visited:</strong> {new Date(visitorInfo.visitedAt).toLocaleString()}
                </div>
                <div className="text-xs text-gray-200 break-all">
                  <strong>User Agent:</strong> {visitorInfo.userAgent}
                </div>
              </div>
            </div>
          )}
          
          <p className="text-red-600 text-sm">
            This action cannot be undone.
          </p>
        </div>
        
        <div className="flex justify-end space-x-3 p-6 border-t rounded-b-lg">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}