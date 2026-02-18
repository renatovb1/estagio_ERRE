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
    <section className="projects-page">
      <div className="projects-layout">
        <header className="projects-head">
          <div>
            <h1>Projetos</h1>
            <p className="projects-subtitle">Lista de projetos publicados.</p>
          </div>
          <Link to="/" className="projects-back">
            Voltar
          </Link>
        </header>

        <div className="projects-content">
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
        </div>
      </div>
    </section>
  );
}
