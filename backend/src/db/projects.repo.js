const { pool } = require("./pool");

async function listPublishedProjects() {
  const result = await pool.query(
    `SELECT * FROM projects
     WHERE is_published = TRUE
     ORDER BY created_at DESC`
  );
  return result.rows;
}

async function listAllProjects() {
  const result = await pool.query(
    `SELECT * FROM projects
     ORDER BY created_at DESC`
  );
  return result.rows;
}

async function getProjectById(id) {
  const result = await pool.query(
    `SELECT * FROM projects WHERE id = $1`,
    [id]
  );
  return result.rows[0] ?? null;
}

async function createProject(data) {
  const { title, description, url, repo_url, image_url, tags, is_published, created_by } = data;

  const result = await pool.query(
    `INSERT INTO projects (title, description, url, repo_url, image_url, tags, is_published, created_by)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
     RETURNING *`,
    [title, description, url, repo_url, image_url, tags, is_published, created_by]
  );

  return result.rows[0];
}

async function updateProject(id, data) {
  const { title, description, url, repo_url, image_url, tags, is_published } = data;

  const result = await pool.query(
    `UPDATE projects
     SET title=$1, description=$2, url=$3, repo_url=$4, image_url=$5, tags=$6, is_published=$7
     WHERE id=$8
     RETURNING *`,
    [title, description, url, repo_url, image_url, tags, is_published, id]
  );

  return result.rows[0] ?? null;
}

async function deleteProject(id) {
  const result = await pool.query(
    `DELETE FROM projects WHERE id=$1 RETURNING *`,
    [id]
  );
  return result.rows[0] ?? null;
}

module.exports = {
  listPublishedProjects,
  listAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};
