const axios = require("axios");

async function notifyNewProject(project) {
  if (!process.env.FORMSPREE_URL) return;

  const payload = {
    subject: "Novo projeto criado",
    message: `Projeto: ${project.title}\nID: ${project.id}\nURL: ${project.url ?? "(sem url)"}`,
  };

  await axios.post(process.env.FORMSPREE_URL, payload, {
    headers: { "Accept": "application/json" },
  });
}

module.exports = { notifyNewProject };
