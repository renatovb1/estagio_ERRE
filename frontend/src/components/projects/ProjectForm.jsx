import { useEffect, useState } from "react";

const LIMITS = {
  title: 55,
  description: 400,
  url: 300,
  repoUrl: 300,
  imageUrl: 300,
  tags: 100,
};

export default function ProjectForm({ initialValue, onSubmit, submitLabel, onCancel }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [repoUrl, setRepoUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [tagsText, setTagsText] = useState("");
  const [isPublished, setIsPublished] = useState(true);

  useEffect(() => {
    if (!initialValue) {
      setTitle("");
      setDescription("");
      setUrl("");
      setRepoUrl("");
      setImageUrl("");
      setTagsText("");
      setIsPublished(true);
      return;
    }

    setTitle(initialValue.title ?? "");
    setDescription(initialValue.description ?? "");
    setUrl(initialValue.url ?? "");
    setRepoUrl(initialValue.repo_url ?? "");
    setImageUrl(initialValue.image_url ?? "");
    setTagsText((initialValue.tags ?? []).join(", "));
    setIsPublished(initialValue.is_published ?? true);
  }, [initialValue]);

  function handleSubmit(e) {
    e.preventDefault();

    const tags = tagsText
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    onSubmit({
      title: title.slice(0, LIMITS.title),
      description: description.slice(0, LIMITS.description),
      url: url.slice(0, LIMITS.url),
      repo_url: repoUrl.slice(0, LIMITS.repoUrl),
      image_url: imageUrl.slice(0, LIMITS.imageUrl),
      tags,
      is_published: isPublished,
      created_by: null,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="admin-form-grid project-form">
      <label className="label">
        Título
        <input
          className="input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={LIMITS.title}
          placeholder="Nome do projeto"
          required
        />
      </label>

      <label className="label">
        Descrição
        <textarea
          className="textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          maxLength={LIMITS.description}
          placeholder="Resumo curto do projeto"
          required
        />
      </label>

      <label className="label">
        URL demo
        <input
          className="input"
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          maxLength={LIMITS.url}
          placeholder="https://..."
        />
      </label>

      <label className="label">
        Repositório
        <input
          className="input"
          type="url"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          maxLength={LIMITS.repoUrl}
          placeholder="https://github.com/..."
        />
      </label>

      <label className="label">
        Imagem
        <input
          className="input"
          type="url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          maxLength={LIMITS.imageUrl}
          placeholder="https://..."
        />
      </label>

      <label className="label">
        Tags
        <input
          className="input"
          value={tagsText}
          onChange={(e) => setTagsText(e.target.value)}
          maxLength={LIMITS.tags}
          placeholder="React, Node, PostgreSQL"
        />
      </label>

      <label className="admin-checkbox">
        <input type="checkbox" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} />
        Publicado
      </label>

      <div className="project-form-actions">
        {onCancel && (
          <button className="btn btn-ghost" type="button" onClick={onCancel}>
            Cancelar
          </button>
        )}
        <button className="btn btn-primary" type="submit">
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
