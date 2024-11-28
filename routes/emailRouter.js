const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Rota para buscar usuário por email
router.get('/email/:email',authMiddleware.authenticateToken, roleMiddleware.authorizeRole(['user', 'manager']),  usuarioController.getByEmail);

module.exports = router;
