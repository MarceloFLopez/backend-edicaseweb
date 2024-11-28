// Importa o Express e o controlador de categoria
const express = require('express');
const router = express.Router();
const autorController = require('../controllers/autorController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// AUTORES
router.get('/autores', authMiddleware.authenticateToken, roleMiddleware.authorizeRole(['user', 'manager']), autorController.getAll);
router.post('/autores', authMiddleware.authenticateToken, roleMiddleware.authorizeRole(['user', 'manager']), autorController.create);
router.get('/autores/:id', authMiddleware.authenticateToken, roleMiddleware.authorizeRole(['user', 'manager']), autorController.getById);
router.get('/autores/busca/:searchString', authMiddleware.authenticateToken, roleMiddleware.authorizeRole(['user', 'manager']), autorController.getByString);
router.put('/autores/:id', authMiddleware.authenticateToken, roleMiddleware.authorizeRole(['user', 'manager']), autorController.update);
router.delete('/autores/:id', authMiddleware.authenticateToken, roleMiddleware.authorizeRole(['user', 'manager']), autorController.delete);

module.exports = router;
