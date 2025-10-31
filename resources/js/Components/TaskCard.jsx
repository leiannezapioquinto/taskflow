import React from "react";

export default function TaskCard({ task, onDelete }) {
  return (
    <div className="p-4 bg-white rounded-2xl shadow hover:shadow-md transition">
      <h2 className="font-semibold text-lg">{task.title}</h2>
      <p className="text-gray-500">{task.description}</p>

      <div className="mt-2 flex justify-between text-sm">
        <span
          className={`px-2 py-1 rounded-lg ${
            task.priority === "high"
              ? "bg-red-100 text-red-700"
              : task.priority === "medium"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {task.priority}
        </span>
        <span className="text-gray-400">
          {task.due_date
            ? "Due: " + new Date(task.due_date).toLocaleDateString()
            : ""}
        </span>
      </div>

      <button
        onClick={() => onDelete(task.id)}
        className="mt-3 text-sm text-red-600 hover:underline"
      >
        Delete
      </button>
    </div>
  );
}
