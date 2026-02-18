import "./CvPage.css";
import { Link } from "react-router-dom";
import SkillCard from "../components/landing/SkillCard.jsx";

export default function CvPage() {
  const skills = [
    {
      icon: "</>",
      title: "Linguagens",
      description: "JavaScript, C#, SQL",
    },
    {
      icon: "▦",
      title: "Frameworks",
      description: "Angular, Bootstrap, Node.js, Express, React, Prisma",
    },
    {
      icon: "⚡",
      title: "Ferramentas",
      description: "Git, GitHub, PostgreSQL, MySQL, Postman, Supabase, Vercel, KNIME, Figma",
    },
  ];

  return (
    <section className="landing-page">
      <header className="landing-topbar">
        <div className="landing-inner">
          <strong className="landing-brand">Portfolio</strong>
          <Link to="/login" className="landing-login-top">
            Entrar
          </Link>
        </div>
      </header>

      <section className="landing-hero">
        <div className="landing-inner landing-hero-inner">
          <h1 className="landing-title">
            Ola, eu sou <span>Renato</span>
          </h1>

          <p className="landing-subtitle">
            Construi experiencias digitais modernas e performaticas. Faz login para poderes ver todos os projetos desenvolvidos até hoje.
          </p>

          <div className="landing-cta-row">
            <Link to="/login" className="landing-cta">
              Entrar
            </Link>
            <Link to="/cv" className="landing-cv-link">
              Vê o meu CV
            </Link>
          </div>
        </div>
      </section>

      <section className="landing-about">
        <div className="landing-inner">
          <h2>Sobre Mim</h2>
          <p className="landing-about-text">
            Sou estudante em Engenharia de Sistemas Informáticos no IPCA, com formação em Desenvolvimento Web e Multimédia.
            Tenho uma grande paixão pela área e estou determinado a evoluir constantemente. 
            Encontro-me disponível e motivado para crescer profissionalmente e pessoalmente.
          </p>

          <div className="landing-skills">
            {skills.map((skill) => (
              <SkillCard key={skill.title} icon={skill.icon} title={skill.title} description={skill.description} />
            ))}
          </div>
        </div>
      </section>

      <footer className="landing-footer">© 2026 Portfolio.</footer>
    </section>
  );
}
