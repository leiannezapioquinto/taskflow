// components/TaskCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { getCategoryStyle } from "./utils/colorUtils";
import { getPriorityColor } from "./utils/priorityUtils";

export default function TaskCard({ task }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/tasks/${task.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm border dark:border-gray-700
                 cursor-pointer hover:shadow-md transition-all hover:scale-[1.01]"
    >
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
        {task.title}
      </h2>

      <div
        className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 prose dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: task.description }}
      />

      <div className="mt-3 flex items-center gap-2 text-sm flex-wrap">
        {/* Category Badge */}
        {task.category && (
          <span
            className="px-3 py-1 rounded-full text-xs font-semibold border"
            style={getCategoryStyle(task.category.color)}
          >
            {task.category.name}
          </span>
        )}

        {/* Priority Badge */}
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(
            task.priority
          )}`}
        >
          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
        </span>
      </div>
    </div>
  );
}
