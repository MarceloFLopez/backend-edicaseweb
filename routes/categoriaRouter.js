// Importa o Express e o controlador de categoria
const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// CATEGORIAS
router.post('/categorias', authMiddleware.authenticateToken, roleMiddleware.authorizeRole(['user', 'manager']), categoriaController.create);
router.get('/categorias', authMiddleware.authenticateToken, roleMiddleware.authorizeRole(['user', 'manager']), categoriaController.getAll);
router.get('/categorias/:id', authMiddleware.authenticateToken, roleMiddleware.authorizeRole(['user', 'manager']), categoriaController.getById);
router.get('/categorias/busca/:searchString', authMiddleware.authenticateToken, roleMiddleware.authorizeRole(['user', 'manager']), categoriaController.getByString);
router.put('/categorias/:id', authMiddleware.authenticateToken, roleMiddleware.authorizeRole(['user', 'manager']), categoriaController.update);
router.delete('/categorias/:id', authMiddleware.authenticateToken, roleMiddleware.authorizeRole(['user', 'manager']), categoriaController.delete);

module.exports = router;