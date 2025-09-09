// src/App.tsx
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ListDetail from "./pages/ListDetail";

export default function App() {
  return (
    <div
      className="w-100 h-100 container py-4 bg-dark text-light"
      style={{ maxWidth: 800 }}
    >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/list/:id" element={<ListDetail />} />
      </Routes>
    </div>
  );
}
