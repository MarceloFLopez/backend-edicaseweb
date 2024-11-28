const express = require('express');
const router = express.Router();

// Importe as funções do controlador
const saqueController = require('../controllers/saqueController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Defina as rotas e passe as funções do controlador como callback
router.get('/saques',authMiddleware.authenticateToken, roleMiddleware.authorizeRole('manager'),  saqueController.getAll);
router.get('/saques/:id',authMiddleware.authenticateToken, roleMiddleware.authorizeRole('manager'),  saqueController.getById);
router.post('/saques',authMiddleware.authenticateToken, roleMiddleware.authorizeRole('manager'),  saqueController.create);
router.put('/saques/:id',authMiddleware.authenticateToken, roleMiddleware.authorizeRole('manager'),  saqueController.update);
router.delete('/saques/:id',authMiddleware.authenticateToken, roleMiddleware.authorizeRole('manager'),  saqueController.delete);

module.exports = router;
