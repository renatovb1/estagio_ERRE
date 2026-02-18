import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { http } from "../api/http.js";
import ProjectForm from "../components/ProjectForm.jsx";
import "./AdminPage.css";

export default function AdminPage() {
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function loadProjects() {
    setMessage("");
    setLoading(true);
    try {
      const res = await http.get("/projects/admin/all");
      setProjects(res.data);
    } catch {
      setProjects([]);
      setMessage("Sem permissões (precisas de login como admin).");
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate(data) {
    setMessage("");
    try {
      const res = await http.post("/projects", data);
      setProjects((prev) => [res.data, ...prev]);
      setMessage("Projeto criado.");
    } catch {
      setMessage("Falha ao criar (precisas de permissões).");
    }
  }

  async function handleUpdate(data) {
    if (!editingProject) return;
    setMessage("");
    try {
      const res = await http.put(`/projects/${editingProject.id}`, data);
      setProjects((prev) => prev.map((p) => (p.id === editingProject.id ? res.data : p)));
      setEditingProject(null);
      setMessage("Projeto atualizado.");
    } catch {
      setMessage("Falha ao atualizar (precisas de permissões).");
    }
  }

  async function handleDelete(id) {
    const ok = window.confirm("Apagar este projeto?");
    if (!ok) return;

    setMessage("");
    try {
      await http.delete(`/projects/${id}`);
      setProjects((prev) => prev.filter((p) => p.id !== id));
      if (editingProject?.id === id) setEditingProject(null);
      setMessage("Projeto apagado.");
    } catch {
      setMessage("Falha ao apagar (precisas de permissões).");
    }
  }

  useEffect(() => {
    loadProjects();
  }, []);

  return (
    <section className="admin-page">
      <div className="admin-shell">
        <header className="admin-head">
          <div className="section-head">
            <h1>Painel Admin</h1>
            <p className="section-subtitle">Gerir projetos do portfólio.</p>
          </div>
          <div className="admin-head-actions">
            <button type="button" className="btn btn-ghost" onClick={loadProjects}>
              Recarregar
            </button>
            <Link to="/projects" className="btn btn-ghost">
              Ver projetos
            </Link>
          </div>
        </header>

        {message && <p className="admin-message">{message}</p>}

        <div className="admin-layout">
          <article className="admin-block">
            <h2>{editingProject ? `Editar #${editingProject.id}` : "Criar novo projeto"}</h2>
            <ProjectForm
              initialValue={editingProject}
              onSubmit={editingProject ? handleUpdate : handleCreate}
              submitLabel={editingProject ? "Guardar alterações" : "Criar projeto"}
            />
            {editingProject && (
              <button type="button" className="btn btn-ghost" onClick={() => setEditingProject(null)}>
                Cancelar edição
              </button>
            )}
          </article>

          <article className="admin-block">
            <h2>Projetos</h2>
            {loading ? (
              <p className="admin-muted">A carregar...</p>
            ) : projects.length === 0 ? (
              <p className="admin-muted">Sem projetos (ou sem permissões).</p>
            ) : (
              <div className="admin-list">
                {projects.map((p) => (
                  <article key={p.id} className="admin-item">
                    <div className="admin-item-head">
                      <strong>
                        #{p.id} — {p.title}
                      </strong>
                      <span>{p.is_published ? "Publicado" : "Rascunho"}</span>
                    </div>
                    <p>{p.description}</p>
                    <div className="admin-item-actions">
                      <button type="button" className="btn btn-ghost" onClick={() => setEditingProject(p)}>
                        Editar
                      </button>
                      <button type="button" className="btn btn-danger" onClick={() => handleDelete(p.id)}>
                        Apagar
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </article>
        </div>
      </div>
    </section>
  );
}
