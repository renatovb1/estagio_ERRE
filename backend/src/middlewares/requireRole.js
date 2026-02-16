function requireRole(role) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: "Não autenticado." });
    if (req.user.role !== role) return res.status(403).json({ error: "Sem permissões." });
    next();
  };
}

module.exports = { requireRole };
