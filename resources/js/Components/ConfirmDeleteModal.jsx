import React from "react";

export default function ConfirmDeleteModal({ category, onClose, onConfirm }) {
  if (!category) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-sm">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
          Delete Category
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Are you sure you want to delete <strong>{category.name}</strong>?
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:underline"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
