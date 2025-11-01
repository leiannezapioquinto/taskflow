import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [categories, setCategories] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [addingCategory, setAddingCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "medium",
    due_date: "",
    category_id: "",
  });

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      const [taskRes, catRes] = await Promise.all([
        fetch(`/api/tasks/${id}`),
        fetch("/api/categories"),
      ]);
      if (taskRes.ok) {
        const taskData = await taskRes.json();
        setTask(taskData);
        setForm({
          title: taskData.title || "",
          description: taskData.description || "",
          priority: taskData.priority || "medium",
          due_date: taskData.due_date ? taskData.due_date.slice(0, 10) : "",
          category_id: taskData.category_id || "",
        });
      }
      if (catRes.ok) {
        setCategories(await catRes.json());
      }
      setLoading(false);
    };
    fetchData();
  }, [id]);

  // Delete handler
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    const res = await fetch(`/api/tasks/${id}`, { method: "DELETE" });
    if (res.ok) navigate("/");
    else alert("Failed to delete task.");
  };

  // Save handler
  const handleSave = async (e) => {
    e.preventDefault();

    // If adding a new category first
    let categoryId = form.category_id;
    if (addingCategory && newCategory.trim()) {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCategory }),
      });
      if (res.ok) {
        const created = await res.json();
        categoryId = created.id;
        setCategories((prev) => [...prev, created]);
      }
    }

    const res = await fetch(`/api/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, category_id: categoryId }),
    });

    if (res.ok) {
      const updated = await res.json();
      setTask(updated);
      setIsEditing(false);
      setAddingCategory(false);
      setNewCategory("");
      triggerToast();
    } else {
      alert("Failed to update task.");
    }
  };

  const triggerToast = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  // Color map for priorities
  const priorityColors = {
    low: "bg-green-500",
    medium: "bg-yellow-500",
    high: "bg-red-500",
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-gray-600 dark:text-gray-300">
        Loading...
      </div>
    );

  if (!task)
    return (
      <div className="flex items-center justify-center h-screen text-gray-600 dark:text-gray-300">
        Task not found.
      </div>
    );

  return (
    <div className="relative min-h-screen flex items-center justify-center p-6 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center block dark:hidden"
        style={{ backgroundImage: "url('/background-light.jpg')", opacity: 0.5 }}
      ></div>
      <div
        className="absolute inset-0 bg-cover bg-center hidden dark:block"
        style={{ backgroundImage: "url('/background-dark.jpg')", opacity: 0.5 }}
      ></div>

      <div className="absolute inset-0 bg-white/40 dark:bg-black/40 backdrop-blur-sm"></div>

      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-5 right-5 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50"
          >
            ✅ Task updated successfully!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Card */}
        <div
          className="relative z-13 w-full max-w-5xl p-10 rounded-2xl backdrop-blur-lg
          bg-white/75 dark:bg-gray-800/70 border border-white/50 dark:border-gray-700/50
          shadow-[0_8px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.6)]"
        >
        {!isEditing ? (
          <>
            <h1 className="text-3xl font-bold mb-2 text-gray-800 dark:text-gray-100">
              {task.title}
            </h1>

            <div className="flex items-center mb-4 gap-2">
              <span
                className={`w-3 h-3 rounded-full ${priorityColors[task.priority]}`}
              ></span>
              <span className="capitalize text-gray-700 dark:text-gray-300">
                {task.priority} priority
              </span>
            </div>

            <p className="text-gray-700 dark:text-gray-200 mb-6 whitespace-pre-wrap">
              {task.description || "No description provided."}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Category
                </p>
                <p className="text-gray-800 dark:text-gray-100 font-medium">
                  {task.category?.name || "Uncategorized"}
                </p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Due Date
                </p>
                <p className="text-gray-800 dark:text-gray-100 font-medium">
                  {task.due_date
                    ? new Date(task.due_date).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
            </div>

            {/* Last Updated */}
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Last updated:{" "}
              {task.updated_at
                ? new Date(task.updated_at).toLocaleString()
                : "Unknown"}
            </p>

            {/* Buttons */}
            <div className="flex justify-between">
              <button
                onClick={() => navigate("/")}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600"
              >
                Back
              </button>

              <div className="flex gap-2">
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          </>
        ) : (
          <form onSubmit={handleSave} className="space-y-4">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
              Edit Task
            </h2>

            <input
              type="text"
              name="title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Title"
              required
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
            />

            <textarea
              name="description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              placeholder="Description"
              rows="4"
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
            ></textarea>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <select
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value })}
                className="p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>

              <input
                type="date"
                value={form.due_date}
                onChange={(e) =>
                  setForm({ ...form, due_date: e.target.value })
                }
                className="p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Category selection */}
            <div>
              {!addingCategory ? (
                <>
                  <select
                    value={form.category_id}
                    onChange={(e) =>
                      setForm({ ...form, category_id: e.target.value })
                    }
                    className="p-2 border rounded-lg w-full dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>

                  <button
                    type="button"
                    onClick={() => setAddingCategory(true)}
                    className="mt-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    + Add new category
                  </button>
                </>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="New category name"
                    className="flex-1 p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={() => setAddingCategory(false)}
                    className="px-3 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
              >
                Save Changes
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
