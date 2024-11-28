const express = require('express');
const router = express.Router();

// Importe as funções do controlador
const revistaController = require('../controllers/revistaController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.get('/revistas', authMiddleware.authenticateToken, roleMiddleware.authorizeRole(['user', 'manager']), revistaController.getAll);
router.post('/revistas', authMiddleware.authenticateToken, roleMiddleware.authorizeRole(['user', 'manager']),  revistaController.create);
router.get('/revistas', authMiddleware.authenticateToken, roleMiddleware.authorizeRole(['user', 'manager']),  revistaController.getAll);
router.get('/revistas/:id', authMiddleware.authenticateToken, roleMiddleware.authorizeRole(['user', 'manager']),  revistaController.getById);
router.get('/revistas/busca/:searchString', authMiddleware.authenticateToken, roleMiddleware.authorizeRole(['user', 'manager']),  revistaController.getByString);
router.put('/revistas/:id', authMiddleware.authenticateToken, roleMiddleware.authorizeRole(['user', 'manager']),  revistaController.update);
router.delete('/revistas/:id', authMiddleware.authenticateToken, roleMiddleware.authorizeRole(['user', 'manager']),  revistaController.delete);


module.exports = router;