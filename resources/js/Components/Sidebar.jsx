import React from "react";

export default function Sidebar({ categories, onSelectCategory }) {
  return (
    <div className="bg-white shadow rounded-2xl p-4 w-full md:w-64">
      <h2 className="text-xl font-bold mb-3">Categories</h2>
      <ul className="space-y-2">
        <li
          onClick={() => onSelectCategory(null)}
          className="cursor-pointer text-gray-700 hover:text-blue-600"
        >
          All Tasks
        </li>
        {categories.map(cat => (
          <li
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className="cursor-pointer text-gray-700 hover:text-blue-600"
          >
            {cat.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
