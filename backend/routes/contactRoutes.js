const express = require('express');
const router = express.Router();

// Rutas
router.get('/', (req, res) => {
  res.send('contacto');
});

module.exports = router;