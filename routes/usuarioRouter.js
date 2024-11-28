// routes/usuarioRouter.js
const express = require('express');
const usuarioController = require('../controllers/usuarioController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

// routes/usuarioRouter.js

router.post('/create-admin',authMiddleware.authenticateToken, roleMiddleware.authorizeRole('manager'), usuarioController.createAdminUser);
router.post('/create-user',authMiddleware.authenticateToken, roleMiddleware.authorizeRole('manager'), usuarioController.createUser);  // Rota para criar o usuário admin

// Rota para login
// router.post('/login', usuarioController.login);

router.get('/usuarios', authMiddleware.authenticateToken, roleMiddleware.authorizeRole('manager'), usuarioController.getAll  );
router.post('/usuarios', authMiddleware.authenticateToken, roleMiddleware.authorizeRole('manager'), usuarioController.create);
router.get('/usuarios/email/:email', authMiddleware.authenticateToken, roleMiddleware.authorizeRole('manager'), usuarioController.getByEmail);
router.put('/usuarios/:id', authMiddleware.authenticateToken, roleMiddleware.authorizeRole('manager'), usuarioController.update);
router.delete('/usuarios/:id', authMiddleware.authenticateToken, roleMiddleware.authorizeRole('manager'), usuarioController.delete);

module.exports = router;
