// components/TaskFilters.jsx
import React from "react";
import { Filter, ChevronDown } from "lucide-react";

export default function TaskFilters({
  categories,
  selectedCategory,
  setSelectedCategory,
  selectedPriority,
  setSelectedPriority,
}) {
  return (
    <div className="flex flex-wrap items-center gap-3 md:gap-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 font-medium">
        <Filter size={18} />
        <span>Filters</span>
      </div>

      {/* Category Filter */}
      <div className="relative">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="appearance-none p-2.5 pr-10 rounded-lg text-sm border border-gray-300 dark:border-gray-700
                     bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100
                     focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none
                     transition-all duration-200"
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <ChevronDown
          size={18}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
        />
      </div>

      {/* Priority Filter */}
      <div className="relative">
        <select
          value={selectedPriority}
          onChange={(e) => setSelectedPriority(e.target.value)}
          className="appearance-none p-2.5 pr-10 rounded-lg text-sm border border-gray-300 dark:border-gray-700
                     bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100
                     focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none
                     transition-all duration-200"
        >
          <option value="all">All Priorities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <ChevronDown
          size={18}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
        />
      </div>
    </div>
  );
}
