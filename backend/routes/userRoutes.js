const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController")
const authMiddleware = require('../middlewares/auth');
const {validateUser}= require("../middlewares/validationUser");

// Rutas
router.get('/', (req, res) => {
  res.send('User');
});

//crear usuarios
router.post("/register",validateUser,userController.createUser);

//inicio sesion con user existente
router.post("/login",userController.loginUser);

// Ruta protegida que requiere autenticación previa del usuario.
router.get("/protected", authMiddleware, (req, res) => {
    res.status(200).send(`Hola usuario`);    
    
});

module.exports = router;




