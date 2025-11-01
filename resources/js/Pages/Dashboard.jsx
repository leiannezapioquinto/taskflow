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

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-500 text-white";
      case "medium":
        return "bg-yellow-400 text-gray-900";
      case "low":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-300 text-gray-800";
    }
  };

  function getCategoryStyle(color) {
    const hex = color?.replace("#", "") || "9ca3af";
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // Calculate relative luminance (brightness)
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    const textColor = brightness > 150 ? "#000" : "#fff"; // black text for light backgrounds, white for dark

    return {
      backgroundColor: `#${hex}`,
      color: textColor,
      borderColor: `#${hex}`,
    };
  }


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
                <div
                  className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 prose dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: task.description }}
                />
                <div className="mt-3 flex items-center gap-2 text-sm flex-wrap">
                  {/* Category Tag */}
                  {task.category && (
                    <span
                      className="px-3 py-1 rounded-full text-xs font-semibold border"
                      style={getCategoryStyle(task.category.color)}
                    >
                      {task.category.name}
                    </span>
                  )}

                  {/* Priority Tag */}
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(
                      task.priority
                    )}`}
                  >
                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                  </span>
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
