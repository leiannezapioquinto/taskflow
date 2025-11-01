import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import Sidebar from "../Components/Sidebar";
import { applyTheme, loadTheme } from "../Components/utils/themeUtils";

export default function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false); // state to toggle sidebar on mobile

  // Load theme preference
  useEffect(() => {
    const savedTheme = loadTheme();
    setDarkMode(savedTheme === "dark");
  }, []);

  // Toggle theme
  const toggleDarkMode = () => {
    const newTheme = darkMode ? "light" : "dark";
    applyTheme(newTheme);
    setDarkMode(!darkMode);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main content */}
      <div className="flex-1 p-6 md:ml-64">
        {/* Mobile toggle button */}
        <button
          className="md:hidden mb-4 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          ☰ Menu
        </button>

        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 shadow-md rounded-2xl p-6">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
            Settings
          </h1>

          <div className="flex items-center justify-between dark:bg-gray-800 p-4 border dark:border-gray-700 rounded-xl">
            <div>
              <h2 className="text-lg font-medium text-gray-800 dark:text-gray-100">
                Dark Mode
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Toggle between light and dark theme.
              </p>
            </div>

            <button
              onClick={toggleDarkMode}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                darkMode
                  ? "bg-gray-700 text-yellow-300 hover:bg-gray-600"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              {darkMode ? <Moon size={18} /> : <Sun size={18} />}
              {darkMode ? "Dark" : "Light"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
