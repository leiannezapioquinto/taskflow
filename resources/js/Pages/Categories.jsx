import React, { useState, useEffect } from "react";
import { Plus, Trash2, Pencil, Menu } from "lucide-react";
import CategoryModal from "../components/CategoryModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import Sidebar from "../components/Sidebar";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Fetch categories
  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  // Add category
  const handleAddCategory = async (newCategory) => {
    const res = await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCategory),
    });
    const data = await res.json();
    setCategories([...categories, data]);
  };

  // Edit category
  const handleEditCategory = async (updatedCategory) => {
    const res = await fetch(`/api/categories/${selectedCategory.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedCategory),
    });
    const data = await res.json();
    setCategories(categories.map((cat) => (cat.id === data.id ? data : cat)));
  };

  // Delete category
  const handleDeleteCategory = async () => {
    if (!categoryToDelete) return;
    await fetch(`/api/categories/${categoryToDelete.id}`, { method: "DELETE" });
    setCategories(categories.filter((c) => c.id !== categoryToDelete.id));
    setShowDeleteModal(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 relative">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <main className="flex-1 md:ml-64 p-4 md:p-8 transition-all duration-300">
        {/* Header */}

        <div className="flex justify-between items-center mb-6">
        {/* Sidebar toggle */}
          <button
            className="md:hidden flex items-center text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={22} />
          </button>

          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">
            Categories
          </h1>

          <button
            onClick={() => {
              setModalMode("add");
              setSelectedCategory(null);
              setShowModal(true);
            }}
            className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition text-sm md:text-base"
          >
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>

        {/* Card Container */}
        <div
          className="w-full mx-auto p-4 md:p-8 rounded-2xl backdrop-blur-lg
          bg-white/75 dark:bg-gray-800/70 border border-white/50 dark:border-gray-700/50
          shadow-[0_8px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.6)]"
        >
          {/* Listing */}
          <div className="grid gap-4">
            {categories.length > 0 ? (
              categories.map((cat) => (
                <div
                  key={cat.id}
                  className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm border dark:border-gray-700"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="w-5 h-5 rounded-full border"
                      style={{ backgroundColor: cat.color }}
                    ></span>
                    <div>
                      <h2 className="font-semibold text-gray-800 dark:text-gray-100">
                        {cat.name}
                      </h2>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">
                        {cat.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 justify-end">
                    <button
                      onClick={() => {
                        setSelectedCategory(cat);
                        setModalMode("edit");
                        setShowModal(true);
                      }}
                      className="text-blue-500 hover:text-blue-600"
                    >
                      <Pencil className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => {
                        setCategoryToDelete(cat);
                        setShowDeleteModal(true);
                      }}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center">
                No categories yet.
              </p>
            )}
          </div>
        </div>
      </main>

      {/* Reusable Add/Edit Modal */}
      {showModal && (
        <CategoryModal
          mode={modalMode}
          initialData={selectedCategory}
          onClose={() => setShowModal(false)}
          onSubmit={modalMode === "edit" ? handleEditCategory : handleAddCategory}
        />
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <ConfirmDeleteModal
          category={categoryToDelete}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDeleteCategory}
        />
      )}
    </div>
  );
}
