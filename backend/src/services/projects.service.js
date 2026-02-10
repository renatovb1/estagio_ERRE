const repo = require("../db/projects.repo");
const { notifyNewProject } = require("./formspree.service");

async function listProjectsPublic() {
  return repo.listPublishedProjects();
}

async function listProjectsAdmin() {
  return repo.listAllProjects();
}

async function getProject(id) {
  return repo.getProjectById(id);
}

async function createProject(data) {
  const created = await repo.createProject(data);

  // side-effect: notificar por email (não deve ficar no controller)
  try {
    await notifyNewProject(created);
  } catch (err) {
    // não deita abaixo o request por falha de email
    console.error("Falha a enviar email Formspree:", err.message);
  }

  return created;
}

async function updateProject(id, data) {
  return repo.updateProject(id, data);
}

async function deleteProject(id) {
  return repo.deleteProject(id);
}

module.exports = {
  listProjectsPublic,
  listProjectsAdmin,
  getProject,
  createProject,
  updateProject,
  deleteProject,
};
