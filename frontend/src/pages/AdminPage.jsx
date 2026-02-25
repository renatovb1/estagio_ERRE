import { useEffect, useState } from "react";
import { http } from "../api/http.js";
import ProjectForm from "../components/projects/ProjectForm.jsx";
import "./AdminPage.css";

export default function AdminPage() {
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      closeModal();
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
      setMessage("Projeto atualizado.");
      closeModal();
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

  function openCreateModal() {
    setEditingProject(null);
    setIsModalOpen(true);
  }

  function openEditModal(project) {
    setEditingProject(project);
    setIsModalOpen(true);
  }

  function closeModal() {
    setEditingProject(null);
    setIsModalOpen(false);
  }

  return (
    <section className="admin-page">
      <div className="admin-shell">
        <header className="admin-head">
          <div className="section-head">
            <h1>Admin</h1>
            <p className="section-subtitle">Gerir projetos do portfólio.</p>
          </div>
          <div className="admin-head-actions">
            <button type="button" className="btn admin-new-btn" onClick={openCreateModal}>
              + Novo Projeto
            </button>
          </div>
        </header>

        {message && <p className="admin-message">{message}</p>}

        <section className="admin-projects-area">
          {loading ? (
            <p className="admin-muted admin-empty">A carregar...</p>
          ) : projects.length === 0 ? (
            <p className="admin-muted admin-empty">Nenhum projeto ainda. Cria o primeiro!</p>
          ) : (
            <div className="admin-list">
              {projects.map((p) => (
                <article key={p.id} className="admin-item">
                  <div className="admin-item-head">
                    <strong>{p.title}</strong>
                    <span>{p.is_published ? "Publicado" : "Rascunho"}</span>
                  </div>
                  <p>{p.description}</p>
                  <div className="admin-item-actions">
                    <button type="button" className="btn btn-ghost" onClick={() => openEditModal(p)}>
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
        </section>
      </div>

      {isModalOpen && (
        <div className="admin-modal-overlay" role="presentation" onClick={closeModal}>
          <section
            className="admin-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="admin-modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="admin-modal-head">
              <h2 id="admin-modal-title">{editingProject ? "Editar Projeto" : "Novo Projeto"}</h2>
              <button type="button" className="admin-modal-close" aria-label="Fechar" onClick={closeModal}>
                ×
              </button>
            </header>

            <ProjectForm
              initialValue={editingProject}
              onSubmit={editingProject ? handleUpdate : handleCreate}
              submitLabel={editingProject ? "Guardar" : "Criar"}
              onCancel={closeModal}
            />
          </section>
        </div>
      )}
    </section>
  );
}
