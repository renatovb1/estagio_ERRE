import { Routes, Route, Navigate } from "react-router-dom";
import CvPage from "./pages/CvPage.jsx";
import CvPreviewPage from "./pages/CvPreviewPage.jsx";
import ProjectsPage from "./pages/ProjectsPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import "./App.css";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<CvPage />} />
        <Route path="/cv" element={<CvPreviewPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
