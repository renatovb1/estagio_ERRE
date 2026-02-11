import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setGuestLogged } from "../utils/auth.js";
import "./LoginPage.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    setGuestLogged(true);
    navigate("/projects");
  }

  return (
    <section className="login-page panel">
      <div className="section-head">
        <span className="section-kicker">ERRE Portfolio</span>
        <h1>Login</h1>
        <p className="section-subtitle">Faz login para entrares na área de projetos.</p>
      </div>

      <form onSubmit={handleLogin} className="login-form">
        <label className="label">
          Email
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="guest@email.com"
            required
          />
        </label>

        <button type="submit" className="btn btn-primary">
          Entrar e ver projetos
        </button>
      </form>
    </section>
  );
}
