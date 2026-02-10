const express = require("express");
const { adminGuard } = require("../middlewares/adminGuard");
const controller = require("../controllers/projects.controller");

const router = express.Router();

// Público
router.get("/", controller.listPublic);
router.get("/:id", controller.getOne);

// Admin (precisa key)
router.get("/admin/all", adminGuard, controller.listAdmin);
router.post("/", adminGuard, controller.create);
router.put("/:id", adminGuard, controller.update);
router.delete("/:id", adminGuard, controller.remove);

module.exports = { projectsRouter: router };
