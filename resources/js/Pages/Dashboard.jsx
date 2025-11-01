import React, { useState, useEffect } from "react";
import { Menu, Search, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await fetch("/api/tasks");
    if (res.ok) {
      const data = await res.json();
      setTasks(data);
    }
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      {/* Sidebar Component */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-64">
        {/* Header */}
        <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow">
          <button
            className="md:hidden text-gray-700 dark:text-gray-200"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu />
          </button>

          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-400 dark:bg-gray-700 dark:text-gray-100"
            />
          </div>
        </header>

        {/* Task Grid */}
        <main className="flex-1 p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <Link
                to={`/tasks/${task.id}`}
                key={task.id}
                className="p-4 bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-lg transition-all duration-200"
              >
                <h2 className="font-semibold text-lg text-gray-800 dark:text-gray-100 mb-2">
                  {task.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
                  {task.description}
                </p>
                <div className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                  Priority: {task.priority}
                </div>
              </Link>
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400">No tasks found.</p>
          )}
        </main>

        {/* Floating Add Button */}
        <Link
          to="/create"
          className="fixed bottom-8 right-8 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-4 shadow-lg transition-all duration-300"
        >
          <Plus size={24} />
        </Link>
      </div>
    </div>
  );
}
