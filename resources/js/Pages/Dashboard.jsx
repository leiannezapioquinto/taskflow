import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";

export default function Dashboard() {
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
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row gap-6 p-6">
      <Sidebar
        categories={categories}
        onSelectCategory={setSelectedCategory}
      />

      <div className="flex-1">
        <TaskForm categories={categories} onTaskAdded={handleTaskAdded} />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredTasks.map(task => (
            <TaskCard key={task.id} task={task} onDelete={handleDelete} />
          ))}
        </div>
      </div>
    </div>
  );
}
