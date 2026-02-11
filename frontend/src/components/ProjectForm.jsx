import { useEffect, useState } from "react";

export default function ProjectForm({ initialValue, onSubmit, submitLabel }) {
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
      title,
      description,
      url,
      repo_url: repoUrl,
      image_url: imageUrl,
      tags,
      is_published: isPublished,
      created_by: null,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="admin-form-grid">
      <label className="label">
        Título
        <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </label>

      <label className="label">
        Descrição
        <textarea
          className="textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
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
          placeholder="https://..."
        />
      </label>

      <label className="label">
        Tags
        <input
          className="input"
          value={tagsText}
          onChange={(e) => setTagsText(e.target.value)}
          placeholder="React, Node, PostgreSQL"
        />
      </label>

      <label className="admin-checkbox">
        <input type="checkbox" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} />
        Publicado
      </label>

      <button className="btn btn-primary" type="submit">
        {submitLabel}
      </button>
    </form>
  );
}
