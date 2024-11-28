// routes/authRouter.js

const express = require('express');
const authController = require('../auth/authController');
const router = express.Router();

// Rota para login de usuário
router.post('/login', authController.login);
router.post('/logout', authController.logout);

module.exports = router;
