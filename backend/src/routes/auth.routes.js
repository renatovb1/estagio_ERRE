const express = require('express');
const controller = require('../controllers/auth.controller');
const { authGuard } = require('../middlewares/authGuard');
const {requireRole} = require("../middlewares/requireRole");

const router = express.Router();

router.post('/register', controller.register);
router.post('/login', controller.login);
router.get('/me', authGuard, requireRole("admin"), controller.me);

module.exports = { authRouter: router };