import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { http } from "../api/http.js";
import ProjectCard from "../components/ProjectCard.jsx";
import "./ProjectsPage.css";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const res = await http.get("/projects");
        setProjects(res.data);
      } catch {
        setError("Erro a carregar projetos. Confirma se o backend está ligado.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return (
    <section className="projects-page panel">
      <div className="projects-topbar">
        <div className="section-head">
          <span className="section-kicker">Área Pública</span>
          <h1>Projetos</h1>
          <p className="section-subtitle">Lista de projetos publicados.</p>
        </div>

        <div className="projects-actions">
          <Link className="btn btn-ghost" to="/">
            Voltar ao Login
          </Link>
          <a className="btn btn-ghost" href="/admin">
            Admin
          </a>
        </div>
      </div>

      {loading ? (
        <p className="projects-feedback">A carregar...</p>
      ) : error ? (
        <p className="projects-feedback projects-feedback-error">{error}</p>
      ) : projects.length === 0 ? (
        <p className="projects-feedback">Sem projetos ainda.</p>
      ) : (
        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </section>
  );
}
