import { Routes, Route, Navigate } from "react-router-dom";
import CvPage from "./pages/CvPage.jsx";
import ProjectsPage from "./pages/ProjectsPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import "./App.css";

export default function App() {
  return (
    <div className="app-root">
      <div className="app-ambient app-ambient-a" />
      <div className="app-ambient app-ambient-b" />

      <main className="app-main">
        <Routes>
          <Route path="/" element={<CvPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/cv" element={<Navigate to="/" replace />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}
