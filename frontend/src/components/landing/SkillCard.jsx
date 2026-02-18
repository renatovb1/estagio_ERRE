export default function SkillCard({ icon, title, description }) {
  return (
    <article className="landing-skill-card">
      <span className="landing-skill-icon">{icon}</span>
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  );
}
