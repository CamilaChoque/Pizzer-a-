const express = require('express');
const router = express.Router();
const pizzaController = require("../controllers/pizzasController")
// Rutas
router.get('/', (req, res) => {
  res.send('Lista de pizzas');
});

//crear productos
router.post("/",pizzaController.createPizza);

module.exports = router;