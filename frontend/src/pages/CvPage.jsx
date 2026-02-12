import "./CvPage.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setGuestLogged } from "../utils/auth.js";
import cvImage from "../assets/Renato Barbosa.png";

export default function CvPage() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    setGuestLogged(true);
    navigate("/projects");
  }

  return (
    <section className="cv-page">
      <div className="cv-layout">
          <article className="cv-viewer">
            <img src={cvImage} alt="CV de Renato Barbosa" className="cv-image" />
          </article>
          <aside className="cv-login">
            <div className="section-head">
              <h1>Login</h1>
              <p className="section-subtitle">Entra para veres os projetos.</p>
            </div>

            <form onSubmit={handleLogin} className="cv-login-form">
                <input
                  className="input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="guest@email.com"
                  required
                />
              <button type="submit" className="btn btn-primary">
                Entrar
              </button>
            </form>
          </aside>
      </div>
    </section>
  );
}
