import { useState } from "react";
import { http } from "../api/http.js";
import { saveToken } from "../utils/auth.js";
import { useNavigate } from "react-router-dom";
import AuthCard from "../components/auth/AuthCard.jsx";
import AuthField from "../components/auth/AuthField.jsx";
import "./AuthPages.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setMsg("");

    try {
      /**
       * Login: envia credenciais e recebe token.
       */
      const res = await http.post("/auth/login", { email, password });

      saveToken(res.data.token);
      navigate("/projects");
    } catch (err) {
      setMsg("Login falhou. Verifica email e password.");
    }
  }

  return (
    <section className="auth-page">
      <AuthCard
        title="Bem-vindo"
        subtitle="Entra para ver os projetos"
        onSubmit={handleLogin}
        submitLabel="Entrar"
        switchText="Não tens conta?"
        switchTo="/register"
        switchLabel="Regista-te"
        message={msg}
      >
        <AuthField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email@exemplo.com"
          required
        />
        <AuthField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
        />
      </AuthCard>
    </section>
  );
}
