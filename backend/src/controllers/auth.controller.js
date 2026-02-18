const { z } = require("zod");
const authService = require("../services/auth.service");

const registerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(3),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

async function register(req, res) {
  try {
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Dados inválidos." });
    }

    const { name, email, password } = parsed.data;
    const result = await authService.register({ name, email, password });

    return res.status(201).json(result);
  } catch (err) {
    const status = err.status || 500;
    return res.status(status).json({ error: err.message || "Erro interno." });
  }
}

async function login(req, res) {
  try {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Dados inválidos." });
    }

    const result = await authService.login(parsed.data);
    return res.json(result);
  } catch (err) {
    const status = err.status || 500;
    return res.status(status).json({ error: err.message || "Erro interno." });
  }
}

async function me(req, res) {
  try {
    // req.user é colocado pelo authGuard
    const user = await authService.me(req.user.id);
    return res.json({ user });
  } catch (err) {
    const status = err.status || 500;
    return res.status(status).json({ error: err.message || "Erro interno." });
  }
}

module.exports = { register, login, me };
