import { useEffect } from "react";
import "./ProjectDetailsModal.css";

function parseTags(tags) {
  if (Array.isArray(tags) && tags.length > 0) return tags;
  return String(tags ?? "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

export default function ProjectDetailsModal({ project, onClose }) {
  const tags = parseTags(project.tags);

  useEffect(() => {
    function handleEsc(event) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div className="project-modal-overlay" role="presentation" onClick={onClose}>
      <section
        className="project-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        {project.image_url ? (
          <img src={project.image_url} alt={project.title} className="project-modal-image" />
        ) : (
          <div className="project-modal-image project-modal-image-fallback">Sem imagem</div>
        )}

        <h2 id="project-modal-title">{project.title}</h2>
        <p className="project-modal-description">{project.description}</p>

        {tags.length > 0 && (
          <div className="project-modal-tags">
            {tags.map((tag) => (
              <span key={tag} className="project-modal-tag">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="project-modal-actions">
          {project.url && (
            <a href={project.url} target="_blank" rel="noreferrer">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3z" />
                <path d="M5 5h6v2H7v10h10v-4h2v6H5V5z" />
              </svg>
              <span>Demo</span>
            </a>
          )}
          {project.repo_url && (
            <a href={project.repo_url} target="_blank" rel="noreferrer">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.03c-3.34.72-4.04-1.61-4.04-1.61-.55-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.72.08-.72 1.2.08 1.83 1.24 1.83 1.24 1.08 1.84 2.82 1.31 3.5 1 .1-.79.42-1.31.76-1.61-2.67-.31-5.46-1.34-5.46-5.95 0-1.31.47-2.38 1.24-3.22-.12-.31-.54-1.57.12-3.27 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.29-1.23 3.29-1.23.67 1.7.25 2.96.12 3.27.77.84 1.24 1.91 1.24 3.22 0 4.62-2.8 5.63-5.47 5.94.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.82.58A12 12 0 0 0 12 .5z" />
              </svg>
              <span>Código</span>
            </a>
          )}
        </div>
      </section>
    </div>
  );
}
