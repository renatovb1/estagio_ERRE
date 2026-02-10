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
  // converter strings vazias em undefined para ficar limpo
  const clean = { ...body };
  for (const k of ["url", "repo_url", "image_url"]) {
    if (clean[k] === "") clean[k] = undefined;
  }
  if (!clean.tags) clean.tags = [];
  if (clean.is_published === undefined) clean.is_published = true;
  return clean;
}

async function listPublic(req, res) {
  const projects = await service.listProjectsPublic();
  res.json(projects);
}

async function listAdmin(req, res) {
  const projects = await service.listProjectsAdmin();
  res.json(projects);
}

async function getOne(req, res) {
  const id = Number(req.params.id);
  const project = await service.getProject(id);
  if (!project) return res.status(404).json({ error: "Projeto não encontrado." });
  res.json(project);
}

async function create(req, res) {
  const parsed = projectSchema.safeParse(normalizeProjectInput(req.body));
  if (!parsed.success) {
    return res.status(400).json({ error: "Dados inválidos.", details: parsed.error.flatten() });
  }
  const created = await service.createProject(parsed.data);
  res.status(201).json(created);
}

async function update(req, res) {
  const id = Number(req.params.id);
  const parsed = projectSchema.safeParse(normalizeProjectInput(req.body));
  if (!parsed.success) {
    return res.status(400).json({ error: "Dados inválidos.", details: parsed.error.flatten() });
  }
  const updated = await service.updateProject(id, parsed.data);
  if (!updated) return res.status(404).json({ error: "Projeto não encontrado." });
  res.json(updated);
}

async function remove(req, res) {
  const id = Number(req.params.id);
  const deleted = await service.deleteProject(id);
  if (!deleted) return res.status(404).json({ error: "Projeto não encontrado." });
  res.json({ ok: true, deleted });
}

module.exports = { listPublic, listAdmin, getOne, create, update, remove };
