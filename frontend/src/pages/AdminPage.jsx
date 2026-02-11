import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { http } from "../api/http.js";
import { getAdminKey, setAdminKey } from "../utils/auth.js";
import ProjectForm from "../components/ProjectForm.jsx";
import "./AdminPage.css";

export default function AdminPage() {
  const [key, setKey] = useState(getAdminKey());
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [editingProject, setEditingProject] = useState(null);

  function getApiErrorMessage(err, fallback) {
    const status = err?.response?.status;
    const apiError = err?.response?.data?.error;
    const fieldErrors = err?.response?.data?.details?.fieldErrors;

    if (fieldErrors && typeof fieldErrors === "object") {
      const firstField = Object.keys(fieldErrors).find(
        (k) => Array.isArray(fieldErrors[k]) && fieldErrors[k].length > 0
      );
      if (firstField) return `${fallback} (${firstField}: ${fieldErrors[firstField][0]})`;
    }

    if (status && apiError) return `${fallback} (${status}: ${apiError})`;
    if (status) return `${fallback} (HTTP ${status})`;
    return fallback;
  }

  async function loadProjects(currentKey) {
    setMessage("");
    setLoading(true);
    try {
      const res = await http.get("/projects/admin/all", { headers: { "x-admin-key": currentKey } });
      setProjects(res.data);
    } catch (err) {
      setProjects([]);
      setMessage(getApiErrorMessage(err, "Não foi possível carregar projetos."));
    } finally {
      setLoading(false);
    }
  }

  function handleSaveKey(e) {
    e.preventDefault();
    setAdminKey(key);
    loadProjects(key);
    setMessage("Admin key guardada.");
  }

  async function handleDelete(projectId) {
    if (!window.confirm("Tens a certeza que queres apagar este projeto?")) return;

    setMessage("");
    try {
      await http.delete(`/projects/${projectId}`, { headers: { "x-admin-key": key } });
      setProjects((prev) => prev.filter((p) => p.id !== projectId));
      if (editingProject?.id === projectId) setEditingProject(null);
      setMessage("Projeto apagado com sucesso.");
    } catch (err) {
      setMessage(getApiErrorMessage(err, "Falha ao apagar."));
    }
  }

  async function handleCreate(data) {
    setMessage("");
    try {
      const res = await http.post("/projects", data, { headers: { "x-admin-key": key } });
      setProjects((prev) => [res.data, ...prev]);
      setMessage("Projeto criado com sucesso.");
    } catch (err) {
      setMessage(getApiErrorMessage(err, "Falha ao criar projeto."));
    }
  }

  async function handleUpdate(data) {
    if (!editingProject) return;

    setMessage("");
    try {
      const res = await http.put(`/projects/${editingProject.id}`, data, { headers: { "x-admin-key": key } });
      setProjects((prev) => prev.map((p) => (p.id === editingProject.id ? res.data : p)));
      setEditingProject(null);
      setMessage("Projeto atualizado com sucesso.");
    } catch (err) {
      setMessage(getApiErrorMessage(err, "Falha ao atualizar."));
    }
  }

  useEffect(() => {
    const saved = getAdminKey();
    if (saved) {
      setKey(saved);
      loadProjects(saved);
    }
  }, []);

  return (
    <section className="admin-page panel">
      <div className="admin-head">
        <div className="section-head">
          <span className="section-kicker">Backoffice</span>
          <h1>Painel Admin</h1>
          <p className="section-subtitle">Cria, edita e remove projetos.</p>
        </div>

        <Link className="btn btn-ghost" to="/projects">
          Ver projetos
        </Link>
      </div>

      <form onSubmit={handleSaveKey} className="admin-key-bar">
        <label className="label admin-key-input-wrap">
          Admin key
          <input
            className="input"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="ADMIN_KEY"
          />
        </label>

        <button type="submit" className="btn btn-primary">
          Guardar
        </button>
        <button type="button" className="btn btn-ghost" onClick={() => loadProjects(key)}>
          Recarregar
        </button>
      </form>

      {message && <p className="admin-message">{message}</p>}

      <div className="admin-layout">
        <article className="admin-block">
          <h2>{editingProject ? `Editar #${editingProject.id}` : "Novo projeto"}</h2>
          <ProjectForm
            initialValue={editingProject}
            onSubmit={editingProject ? handleUpdate : handleCreate}
            submitLabel={editingProject ? "Guardar alterações" : "Criar projeto"}
          />
          {editingProject && (
            <button className="btn btn-ghost" onClick={() => setEditingProject(null)}>
              Cancelar edição
            </button>
          )}
        </article>

        <article className="admin-block">
          <h2>Projetos</h2>

          {loading ? (
            <p className="admin-muted">A carregar...</p>
          ) : projects.length === 0 ? (
            <p className="admin-muted">Sem projetos para mostrar.</p>
          ) : (
            <div className="admin-list">
              {projects.map((p) => (
                <article key={p.id} className="admin-item">
                  <div className="admin-item-head">
                    <strong>
                      #{p.id} {p.title}
                    </strong>
                    <span>{p.is_published ? "Publicado" : "Rascunho"}</span>
                  </div>

                  <p>{p.description}</p>

                  {p.tags?.length > 0 && <small>Tags: {p.tags.join(", ")}</small>}

                  <div className="admin-item-actions">
                    <button className="btn btn-ghost" onClick={() => setEditingProject(p)}>
                      Editar
                    </button>
                    <button className="btn btn-danger" onClick={() => handleDelete(p.id)}>
                      Apagar
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </article>
      </div>
    </section>
  );
}
