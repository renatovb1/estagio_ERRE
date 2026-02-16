const { z } = require("zod");
const service = require("../services/projects.service");

const projectSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  url: z.string().url().optional().or(z.literal("")),
  repo_url: z.string().url().optional().or(z.literal("")),
  image_url: z.string().url().optional().or(z.literal("")),
  tags: z.array(z.string()).optional(),
  is_published: z.boolean().optional(),
  created_by: z.number().int().optional().nullable(),
});

function normalizeProjectInput(body) {
  const clean = { ...body };
  for (const k of ["url", "repo_url", "image_url"]) {
    if (clean[k] === "") clean[k] = undefined;
  }
  if (!clean.tags) clean.tags = [];
  if (clean.is_published === undefined) clean.is_published = true;
  return clean;
}

async function listPublic(req, res) {
  try {
    const projects = await service.listProjectsPublic();
    return res.json(projects);
  } catch (err) {
    const status = err.status || 500;
    return res.status(status).json({ error: err.message || "Erro interno." });
  }
}

async function listAdmin(req, res) {
  try {
    const projects = await service.listProjectsAdmin();
    return res.json(projects);
  } catch (err) {
    const status = err.status || 500;
    return res.status(status).json({ error: err.message || "Erro interno." });
  }
}

async function getOne(req, res) {
  try {
    const id = Number(req.params.id);
    const project = await service.getProject(id);

    if (!project) {
      return res.status(404).json({ error: "Projeto não encontrado." });
    }

    return res.json(project);
  } catch (err) {
    const status = err.status || 500;
    return res.status(status).json({ error: err.message || "Erro interno." });
  }
}

async function create(req, res) {
  try {
    const parsed = projectSchema.safeParse(normalizeProjectInput(req.body));
    if (!parsed.success) {
      return res.status(400).json({ error: "Dados inválidos." });
    }

    const created = await service.createProject(parsed.data);
    return res.status(201).json(created);
  } catch (err) {
    const status = err.status || 500;
    return res.status(status).json({ error: err.message || "Erro interno." });
  }
}

async function update(req, res) {
  try {
    const id = Number(req.params.id);

    const parsed = projectSchema.safeParse(normalizeProjectInput(req.body));
    if (!parsed.success) {
      return res.status(400).json({ error: "Dados inválidos." });
    }

    const updated = await service.updateProject(id, parsed.data);
    if (!updated) {
      return res.status(404).json({ error: "Projeto não encontrado." });
    }

    return res.json(updated);
  } catch (err) {
    const status = err.status || 500;
    return res.status(status).json({ error: err.message || "Erro interno." });
  }
}

async function remove(req, res) {
  try {
    const id = Number(req.params.id);

    const deleted = await service.deleteProject(id);
    if (!deleted) {
      return res.status(404).json({ error: "Projeto não encontrado." });
    }

    return res.json({ ok: true, deleted });
  } catch (err) {
    const status = err.status || 500;
    return res.status(status).json({ error: err.message || "Erro interno." });
  }
}

module.exports = { listPublic, listAdmin, getOne, create, update, remove };
