const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { projectsRouter } = require("./routes/projects.routes");
const { authRouter } = require("./routes/auth.routes");

const app = express();

app.use(cors({
  origin: true, 
}));

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

app.use("/projects", projectsRouter);

app.use("/auth", authRouter);

module.exports = { app };
