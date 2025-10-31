import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TaskForm({ categories, onTaskAdded, url }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "medium",
    due_date: "",
    category_id: "",
  });
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      const data = await res.json();
      onTaskAdded(data);
      setForm({
        title: "",
        description: "",
        priority: "medium",
        due_date: "",
        category_id: "",
      });

      // Redirect after success
      if (url) {
        navigate(url);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-2xl shadow mb-4"
    >
      <h2 className="font-semibold text-lg mb-3">Add New Task</h2>

      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Task title"
        className="w-full border rounded-lg px-3 py-2 mb-2"
        required
      />

      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full border rounded-lg px-3 py-2 mb-2"
      />

      <select
        name="priority"
        value={form.priority}
        onChange={handleChange}
        className="w-full border rounded-lg px-3 py-2 mb-2"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <input
        type="date"
        name="due_date"
        value={form.due_date}
        onChange={handleChange}
        className="w-full border rounded-lg px-3 py-2 mb-2"
      />

      <select
        name="category_id"
        value={form.category_id}
        onChange={handleChange}
        className="w-full border rounded-lg px-3 py-2 mb-3"
      >
        <option value="">Select Category</option>
        {categories.map(cat => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
      >
        Add Task
      </button>
    </form>
  );
}
