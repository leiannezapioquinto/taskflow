// components/utils/priorityUtils.js
export function getPriorityColor(priority) {
  switch (priority) {
    case "high":
      return "bg-red-500 text-white";
    case "medium":
      return "bg-yellow-400 text-black";
    case "low":
      return "bg-green-500 text-white";
    default:
      return "bg-gray-400 text-white";
  }
}
