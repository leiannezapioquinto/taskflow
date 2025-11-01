import React, { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";
import AddCategoryModal from "../components/AddCategoryModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import Sidebar from "../components/Sidebar";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  // Fetch categories
  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  // Add category handler
  const handleAddCategory = async (newCategory) => {
    const res = await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCategory),
    });
    const data = await res.json();
    setCategories([...categories, data]);
  };

  // Delete category handler
  const handleDeleteCategory = async () => {
    if (!categoryToDelete) return;
    await fetch(`/api/categories/${categoryToDelete.id}`, { method: "DELETE" });
    setCategories(categories.filter((c) => c.id !== categoryToDelete.id));
    setShowDeleteModal(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        <div
          className="w-full max-w-8xl mx-auto p-8 rounded-2xl backdrop-blur-lg
          bg-white/75 dark:bg-gray-800/70 border border-white/50 dark:border-gray-700/50
          shadow-[0_8px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.6)]"
        >
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
              Categories
            </h1>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
            >
              <Plus className="w-4 h-4" /> Add Category
            </button>
          </div>

          {/* Listing */}
          <div className="grid gap-4">
            {categories.length > 0 ? (
              categories.map((cat) => (
                <div
                  key={cat.id}
                  className="flex justify-between items-center p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm border dark:border-gray-700"
                >
                  <div>
                    <h2 className="font-semibold text-gray-800 dark:text-gray-100">
                      {cat.name}
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      {cat.description}
                    </p>
                  </div>
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
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400">
                No categories yet.
              </p>
            )}
          </div>
        </div>
      </main>

      {/* Modals */}
      {showAddModal && (
        <AddCategoryModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddCategory}
        />
      )}

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
