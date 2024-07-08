const express = require('express');
const router = express.Router();

// Rutas
router.get('/', (req, res) => {
  res.send('pedidos');
});

module.exports = router;