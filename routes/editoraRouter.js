// Importa o Express e o controlador de categoria
const express = require('express');
const router = express.Router();
const editoraController = require('../controllers/editoraController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.post('/editoras',authMiddleware.authenticateToken, roleMiddleware.authorizeRole(['user', 'manager']), editoraController.create);
router.get('/editoras',authMiddleware.authenticateToken, roleMiddleware.authorizeRole(['user', 'manager']), editoraController.getAll);
router.get('/editoras/:id',authMiddleware.authenticateToken, roleMiddleware.authorizeRole(['user', 'manager']), editoraController.getById);
router.get('/editoras/busca/:searchString',authMiddleware.authenticateToken, roleMiddleware.authorizeRole(['user', 'manager']), editoraController.getByString);
router.put('/editoras/:id',authMiddleware.authenticateToken, roleMiddleware.authorizeRole(['user', 'manager']), editoraController.update);
router.delete('/editoras/:id',authMiddleware.authenticateToken, roleMiddleware.authorizeRole(['user', 'manager']), editoraController.delete);

module.exports = router;