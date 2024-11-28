// Importa o Express e o controlador de categoria
const express = require('express');
const router = express.Router();
const bancaController = require('../controllers/bancaController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// AUTORES
router.post('/bancas', authMiddleware.authenticateToken, roleMiddleware.authorizeRole(['user', 'manager']),  bancaController.create);
router.get('/bancas', authMiddleware.authenticateToken, roleMiddleware.authorizeRole(['user', 'manager']),  bancaController.getAll);
router.get('/bancas/:id', authMiddleware.authenticateToken, roleMiddleware.authorizeRole(['user', 'manager']),  bancaController.getById);
router.get('/bancas/busca/:searchString', authMiddleware.authenticateToken, roleMiddleware.authorizeRole(['user', 'manager']),  bancaController.getByString);
router.put('/bancas/:id', authMiddleware.authenticateToken, roleMiddleware.authorizeRole(['user', 'manager']),  bancaController.update);
router.delete('/bancas/:id', authMiddleware.authenticateToken, roleMiddleware.authorizeRole(['user', 'manager']),  bancaController.delete);

module.exports = router;
