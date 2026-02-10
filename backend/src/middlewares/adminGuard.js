function adminGuard(req, res, next) {
  const adminKey = req.header("x-admin-key");
  if (!adminKey || adminKey !== process.env.ADMIN_KEY) {
    return res.status(403).json({ error: "Forbidden: admin key inválida." });
  }
  next();
}

module.exports = { adminGuard };
