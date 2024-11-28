const express = require('express');
const router = express.Router();

// Importe as funções do controlador
const simplifcadadController = require('../controllers/simpificadaController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');


// Defina as rotas e passe as funções do controlador como callback
router.get('/simplificadas', authMiddleware.authenticateToken, roleMiddleware.authorizeRole(['user', 'manager']), simplifcadadController.getAll);
router.get('/simplificadas/:id', authMiddleware.authenticateToken, roleMiddleware.authorizeRole(['user', 'manager']), simplifcadadController.getById);
router.post('/simplificadas', authMiddleware.authenticateToken, roleMiddleware.authorizeRole(['user', 'manager']), simplifcadadController.create);
router.put('/simplificadas/:id', authMiddleware.authenticateToken, roleMiddleware.authorizeRole(['user', 'manager']), simplifcadadController.update);
router.delete('/simplificadas/:id', authMiddleware.authenticateToken, roleMiddleware.authorizeRole(['user', 'manager']), simplifcadadController.delete);

module.exports = router;
