// src/App.tsx
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ListDetail from "./pages/ListDetail";

export default function App() {
  return (
    <div className="container py-4">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/list/:id" element={<ListDetail />} />
      </Routes>
    </div>
  );
}
