const express = require('express');
const router = express.Router();
const pizzaController = require("../controllers/pizzasController")
const {validatePizza}= require("../middlewares/validationPizzas");
const authAdmin= require('../middlewares/auth');

// Rutas
router.get('/', (req, res) => {
  res.send('Lista de pizzas');
});

//crear productos
router.post("/crear",authAdmin,validatePizza,pizzaController.createPizza);

module.exports = router;