// src/components/Sidebar.jsx
import React, { useState, useEffect } from "react";
import { House, Folder, Settings } from "lucide-react";
import { Link } from "react-router-dom";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories from API
    const fetchCategories = async () => {
      const res = await fetch("/api/categories");
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
      }
    };
    fetchCategories();
  }, []);

  return (
    <aside
      className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg z-20 transform transition-transform duration-300 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">
          TaskFlow
        </h1>
        <button
          className="md:hidden text-gray-600 dark:text-gray-300"
          onClick={() => setSidebarOpen(false)}
        >
          ✕
        </button>
      </div>

      <nav className="mt-6 space-y-2">
        <Link
          to="/"
          className="block px-6 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
            <span className="inline-flex items-center space-x-2">
              <House className="w-5 h-5" />
              <span>Notes</span>
            </span>
        </Link>

        <Link
                  to="/categories"
                  className="block px-6 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                    <span className="inline-flex items-center space-x-2">
                      <Folder className="w-5 h-5" />
                      <span>Categories</span>
                    </span>
                </Link>

        <Link
          to="/settings"
          className="block px-6 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
            <span className="inline-flex items-center space-x-2">
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </span>
        </Link>
      </nav>
    </aside>
  );
}
