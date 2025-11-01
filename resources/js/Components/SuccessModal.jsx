// src/components/SuccessModal.jsx
import React from "react";

export default function SuccessModal({ show, title, message }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 text-center w-80 animate-fadeIn">
        <h2 className="text-xl font-semibold text-green-600 mb-2">{title}</h2>
        <p className="text-gray-700 dark:text-gray-300">{message}</p>
      </div>
    </div>
  );
}
