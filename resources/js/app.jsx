import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Create from "./pages/Create";
import Show from "./pages/Show";
import Categories from "./pages/Categories";
import Settings from "./pages/Settings";
import { loadTheme } from "./Components/utils/themeUtils";

export default function App() {
  useEffect(() => {
    loadTheme();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/create" element={<Create />} />
        <Route path="/tasks/:id" element={<Show />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}
