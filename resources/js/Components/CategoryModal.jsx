import React, { useState, useEffect } from "react";
import SuccessModal from "./SuccessModal";

export default function CategoryModal({ onClose, onSubmit, initialData = null, mode = "add" }) {
  const [form, setForm] = useState({ name: "", description: "", color: "#3b82f6" });
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || "",
        description: initialData.description || "",
        color: initialData.color || "#3b82f6",
      });
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await onSubmit(form);
    if (result !== false) {
      setShowSuccess(true);
      // Wait a bit, then close both modals
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
      }, 1500);
    }
  };

  return (
    <>
      {/* ✅ Success Modal rendered at a higher z-index */}
      {showSuccess && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">
          <SuccessModal
            show={showSuccess}
            title={mode === "edit" ? "Category Updated!" : "Category Added!"}
            message={
              mode === "edit"
                ? "Your category details were successfully updated."
                : "Your new category has been saved."
            }
          />
        </div>
      )}

      {/* Category Form Modal */}
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[1000]">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-md">
          <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
            {mode === "edit" ? "Edit Category" : "Add New Category"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-300">Name</label>
              <input
                type="text"
                className="w-full p-2 rounded-lg border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-300">Description</label>
              <textarea
                className="w-full p-2 rounded-lg border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              ></textarea>
            </div>

            {/* Color */}
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-300">Color</label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  className="w-10 h-10 border rounded-md cursor-pointer"
                  value={form.color}
                  onChange={(e) => setForm({ ...form, color: e.target.value })}
                />
                <span className="text-sm text-gray-500 dark:text-gray-400">{form.color}</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:underline"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
              >
                {mode === "edit" ? "Update" : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
