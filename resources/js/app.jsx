import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Create from "./pages/Create";
import Show from "./pages/Show";
import Categories from "./pages/Categories";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/create" element={<Create />} />
        <Route path="/tasks/:id" element={<Show />} />
        <Route path="/categories" element={<Categories />} />
      </Routes>
    </Router>
  );
}
