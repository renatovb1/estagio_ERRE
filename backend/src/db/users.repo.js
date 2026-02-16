const { pool } = require("./pool");

async function createUser({name, email, password_hash, role}){
    const result = await pool.query(
        `INSERT INTO users (name, email, password_hash, role)
         VALUES ($1, $2, $3, $4)
         RETURNING *`,
        [name, email, password_hash, role]
    );
    return result.rows[0];
}  

async function findUserByEmail(email) {
    const result = await pool.query(
        `SELECT * FROM users WHERE email = $1`,
        [email]
    );
    return result.rows[0] ?? null;
}

async function findUserById(id) {
    const result = await pool.query(
        `SELECT id, name, email, role FROM users WHERE id = $1`,
        [id]
    );
    return result.rows[0] ?? null;
}

module.exports = {
    createUser,
    findUserByEmail,
    findUserById
}