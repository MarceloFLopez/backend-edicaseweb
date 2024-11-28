// Importa o Express e o controlador de categoria
const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.post('/clientes',authMiddleware.authenticateToken, roleMiddleware.authorizeRole(['user', 'manager']), clienteController.create);
router.get('/clientes',authMiddleware.authenticateToken, roleMiddleware.authorizeRole(['user', 'manager']), clienteController.getAll);
router.get('/clientes/:id',authMiddleware.authenticateToken, roleMiddleware.authorizeRole(['user', 'manager']), clienteController.getById);
router.get('/clientes/busca/:searchString',authMiddleware.authenticateToken, roleMiddleware.authorizeRole(['user', 'manager']), clienteController.getByString);
router.put('/clientes/:id',authMiddleware.authenticateToken, roleMiddleware.authorizeRole(['user', 'manager']), clienteController.update);
router.delete('/clientes/:id',authMiddleware.authenticateToken, roleMiddleware.authorizeRole(['user', 'manager']), clienteController.delete);


module.exports = router;