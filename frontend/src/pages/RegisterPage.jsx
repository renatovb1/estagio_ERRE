import { useState } from "react";
import { http } from "../api/http.js";
import { saveRole, saveToken } from "../utils/auth.js";
import { useNavigate } from "react-router-dom";
import AuthCard from "../components/auth/AuthCard.jsx";
import AuthField from "../components/auth/AuthField.jsx";
import "./AuthPages.css";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg("");

    try {
      const res = await http.post("/auth/register", { name, email, password });

      // Guardar token para ficar autenticado logo após registo
      saveToken(res.data.token);
      saveRole(res.data?.user?.role);

      setMsg("Conta criada com sucesso!");
      navigate("/projects");
    } catch (err) {
      setMsg("Erro ao criar conta. Verifica os dados ou se o email já existe.");
    }
  }

  return (
    <section className="auth-page">
      <AuthCard
        variant="register"
        title="Criar conta"
        subtitle="Regista-te para explorar o portfólio"
        onSubmit={handleSubmit}
        submitLabel="Criar conta"
        switchText="Já tens conta?"
        switchTo="/login"
        switchLabel="Entra"
        message={msg}
      >
        <AuthField
          label="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="O teu nome"
          required
        />
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
          minLength={6}
          required
        />
      </AuthCard>
    </section>
  );
}
