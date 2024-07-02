const express = require('express');
const router = express.Router();

// Rutas
router.get('/', (req, res) => {
  res.send('sector-administrativo');
});

module.exports = router;