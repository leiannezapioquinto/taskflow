import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TaskForm from "../components/TaskForm";

export default function Create() {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate(); // <-- for navigation

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      if (!res.ok) throw new Error("Failed to fetch categories");
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleTaskAdded = (newTask) => setTasks([newTask, ...tasks]);

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Create Task</h1>
        <button
          onClick={() => navigate("/")}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1.5 rounded-lg"
        >
          ← Back
        </button>
      </div>

      <TaskForm categories={categories} onTaskAdded={handleTaskAdded} />
    </div>
  );
}
