const express = require('express');
const router = express.Router();
const programacaoController = require('../controllers/programacaoController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.post('/programacoes',authMiddleware.authenticateToken, roleMiddleware.authorizeRole(['user', 'manager']),  programacaoController.create);
router.get('/programacoes', authMiddleware.authenticateToken, roleMiddleware.authorizeRole(['user', 'manager']), programacaoController.getAll);
router.get('/programacoes/:id', authMiddleware.authenticateToken, roleMiddleware.authorizeRole(['user', 'manager']), programacaoController.getById);
router.put('/programacoes/:id', authMiddleware.authenticateToken, roleMiddleware.authorizeRole(['user', 'manager']), programacaoController.update);
router.delete('/programacoes/:id', authMiddleware.authenticateToken, roleMiddleware.authorizeRole(['user', 'manager']), programacaoController.delete);
router.get('/programacoes/busca/:searchString', authMiddleware.authenticateToken, roleMiddleware.authorizeRole(['user', 'manager']), programacaoController.findByString);

module.exports = router;
