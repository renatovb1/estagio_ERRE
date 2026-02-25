import "./ProjectCard.css";

export default function ProjectCard({ project, onOpen }) {
  const tags =
    Array.isArray(project.tags) && project.tags.length > 0
      ? project.tags
      : String(project.tags ?? "")
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean);

  return (
    <article
      className="project-card"
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(e) => {
        if ((e.key === "Enter" || e.key === " ") && onOpen) {
          e.preventDefault();
          onOpen();
        }
      }}
    >
      <div className="project-media">
        {project.image_url ? (
          <img src={project.image_url} alt={project.title} className="project-image" />
        ) : (
          <div className="project-image project-image-fallback">?</div>
        )}
      </div>

      <div className="project-body">
        <h3>{project.title}</h3>
        <p className="project-description">{project.description}</p>

        {tags.length > 0 && (
          <div className="project-tags">
            {tags.map((tag) => (
              <span key={tag} className="project-tag">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="project-links">
          {project.url && (
            <a href={project.url} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3z" />
                <path d="M5 5h6v2H7v10h10v-4h2v6H5V5z" />
              </svg>
              <span>Demo</span>
            </a>
          )}
          {project.repo_url && (
            <a href={project.repo_url} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.03c-3.34.72-4.04-1.61-4.04-1.61-.55-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.72.08-.72 1.2.08 1.83 1.24 1.83 1.24 1.08 1.84 2.82 1.31 3.5 1 .1-.79.42-1.31.76-1.61-2.67-.31-5.46-1.34-5.46-5.95 0-1.31.47-2.38 1.24-3.22-.12-.31-.54-1.57.12-3.27 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.29-1.23 3.29-1.23.67 1.7.25 2.96.12 3.27.77.84 1.24 1.91 1.24 3.22 0 4.62-2.8 5.63-5.47 5.94.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.82.58A12 12 0 0 0 12 .5z" />
              </svg>
              <span>Código</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
