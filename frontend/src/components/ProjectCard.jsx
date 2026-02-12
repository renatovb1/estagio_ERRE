import "./ProjectCard.css";

export default function ProjectCard({ project }) {
  return (
    <article className="project-card">
      <header className="project-card-top">
        <h3>{project.title}</h3>
      </header>

      <p className="project-description">{project.description}</p>

      {project.tags?.length > 0 && (
        <div className="project-tags">
          {project.tags.map((tag) => (
            <span key={tag} className="project-tag">
              {tag}
            </span>
          ))}
        </div>
      )}

      <footer className="project-links">
        {project.url && (
          <a href={project.url} target="_blank" rel="noreferrer">
            Demo
          </a>
        )}
        {project.repo_url && (
          <a href={project.repo_url} target="_blank" rel="noreferrer">
            Repositório
          </a>
        )}
      </footer>
    </article>
  );
}
