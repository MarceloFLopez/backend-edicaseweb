const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Importe as funções do controlador
const artigoController = require('../controllers/artigoController');

// Defina as rotas e passe as funções do controlador como callbackmanager
router.get('/artigos',        authMiddleware.authenticateToken, roleMiddleware.authorizeRole(['user', 'manager']), artigoController.getaAll);
router.get('/artigos/:id',    authMiddleware.authenticateToken, roleMiddleware.authorizeRole(['user', 'manager']), artigoController.getById);
router.post('/artigos',       authMiddleware.authenticateToken, roleMiddleware.authorizeRole(['user', 'manager']), artigoController.create);
router.put('/artigos/:id',    authMiddleware.authenticateToken, roleMiddleware.authorizeRole(['user', 'manager']), artigoController.update);
router.delete('/artigos/:id', authMiddleware.authenticateToken, roleMiddleware.authorizeRole(['user', 'manager']), artigoController.delete);

module.exports = router;
