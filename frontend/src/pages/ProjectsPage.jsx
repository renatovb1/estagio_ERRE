import { useEffect, useState } from "react";
import { http } from "../api/http.js";
import ProjectCard from "../components/projects/ProjectCard.jsx";
import ProjectDetailsModal from "../components/projects/ProjectDetailsModal.jsx";
import "./ProjectsPage.css";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);

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

  function openProjectModal(project) {
    setSelectedProject(project);
  }

  function closeProjectModal() {
    setSelectedProject(null);
  }

  return (
    <section className="projects-page">
      <div className="projects-layout">
        <header className="projects-head">
          <div>
            <h1>Projetos</h1>
            <p className="projects-subtitle">Uma coleção dos meus trabalhos recentes.</p>
          </div>
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
                <ProjectCard key={project.id} project={project} onOpen={() => openProjectModal(project)} />
              ))}
            </div>
          )}
        </div>
      </div>

      {selectedProject && <ProjectDetailsModal project={selectedProject} onClose={closeProjectModal} />}
    </section>
  );
}
