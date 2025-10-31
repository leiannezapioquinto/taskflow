import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import TaskCard from "../components/TaskCard";

export default function Index() {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchTasks = async () => {
    const res = await fetch("/api/tasks");
    const data = await res.json();
    setTasks(data);
  };

  const fetchCategories = async () => {
    const res = await fetch("/api/categories");
    const data = await res.json();
    setCategories(data);
  };

  useEffect(() => {
    fetchTasks();
    fetchCategories();
  }, []);

  const handleTaskAdded = newTask => setTasks([newTask, ...tasks]);
  const handleDelete = async id => {
    await fetch(`/api/tasks/${id}`, { method: "DELETE" });
    setTasks(tasks.filter(t => t.id !== id));
  };

  const filteredTasks = selectedCategory
    ? tasks.filter(t => t.category_id === selectedCategory)
    : tasks;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Task List</h1>

      <Link
        to="/create"
        className="inline-block bg-blue-600 text-white px-4 py-2 rounded"
      >
        Create Task
      </Link>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredTasks.map(task => (
          <TaskCard key={task.id} task={task} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}
