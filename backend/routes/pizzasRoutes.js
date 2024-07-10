const express = require('express');
const router = express.Router();
const pizzaController = require("../controllers/pizzasController")
const {validatePizza}= require("../middlewares/validationPizzas");
const authAdmin= require('../middlewares/auth');

// Rutas
router.get("/", pizzaController.getPizzas);
//crear productos
router.post("/crear",authAdmin,validatePizza,pizzaController.createPizza);
router.put("/actualizar/:id",authAdmin,validatePizza,pizzaController.updatePizza);
router.delete("/eliminar/:id",authAdmin,validatePizza,pizzaController.deletePizza);

module.exports = router;