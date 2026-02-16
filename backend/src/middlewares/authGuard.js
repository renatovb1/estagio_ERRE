const jwt = require('jsonwebtoken');

function authGuard(req, res, next) {
    const header = req.header("Authorization");
    const [type, token] = header.split(" ");

    if (type !== "Bearer" || !token) {
        return res.status(401).json({ error: "Não autenticado" });
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {
            id: Number (payload.sub),
            role: payload.role,
            email: payload.email
        };
        next();
    }

    catch (err) {
        return res.status(401).json({ error: "Token inválido ou expirado" });
    }
}

module.exports = { authGuard };