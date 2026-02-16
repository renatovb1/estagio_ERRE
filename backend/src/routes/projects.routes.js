const express = require("express");
const {authGuard} = require("../middlewares/authGuard");
const {requireRole} = require("../middlewares/requireRole");
const controller = require("../controllers/projects.controller");

const router = express.Router();

// Público
router.get("/", controller.listPublic);

// Admin 
router.get("/admin/all", authGuard, requireRole("admin"), controller.listAdmin);
router.post("/", authGuard, requireRole("admin"), controller.create);
router.put("/:id", authGuard, requireRole("admin"), controller.update);
router.delete("/:id", authGuard, requireRole("admin"), controller.remove);


// Público (deixar por último para não capturar /admin/all como ":id")
router.get("/:id", controller.getOne);

module.exports = { projectsRouter: router };
